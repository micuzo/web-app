import * as express from "express";
import { Client } from "pg";
import * as fs from "fs";

const router = express.Router();
const dbConfig = JSON.parse(fs.readFileSync(process.cwd() + '/postgres.json', 'utf-8'));

const client = new Client(dbConfig);
client.connect();



router.get('/book', (req, res, next) => {
    client.query('select isbn, publisher_name, title, author, genre, pages, price, quantity from book natural join publisher', (err, data) => {
        res.locals.err = err;
        res.locals.data = data.rows;
        next();
    });
});

router.get('/book/:search', (req, res, next) => {
    const where = isNaN(req.params.search) ? "where title = $1 or author = $1 or genre = $1" : "where isbn = $1";
    const text = "select isbn, publisher_name, title, author, genre, pages, price, quantity from book natural join publisher " + where;
    const values = [req.params.search];
    client.query(text, values, (err, data) => {
        res.locals.err = err;
        res.locals.data = data.rows;
        next();
    });
});

router.get('/book*', (req,res) => {
    if (res.locals.err) res.status(404).send("Error: " + res.locals.err);
    const booksForFE = res.locals.data.map((book) => ({
        ISBN: book.isbn,
        publisher: book.publisher_name,
        title: book.title,
        author: book.author,
        genre: book.genre,
        pages: book.pages,
        price: book.price,
        quantity: book.quantity
    }));
    res.json(booksForFE);
});

router.get('/order/:id', (req, res, next) => {
    client.query("select title, author, book_order.quantity, order_location, price, total " 
        + "from book_order, book " 
        + "where book.isbn = book_order.isbn and order_number = $1", 
        [req.params.id], 
        (err, data) => {
            if (err) res.status(404).send("Error: " + err);
            res.json(data.rows);
        });
});

router.post('/order', (req, res) => {
    //Get next order_number
    client.query("select max(order_number) from book_order", (err, data) => {
        if (err) res.send("Error: " + err);
        const nextOrdedNo = data.rows[0].max + 1;
        
        //Get price map to compute total
        const payload = req.body;
        let updateCounter = 0;
        let inClause = "in (";
        Object.keys(payload.bookCount).forEach((isbn: string, index) => {
            const last = index >= Object.keys(payload.bookCount).length - 1;
            inClause += !last ? `$${index + 1}, ` : `$${index + 1})`;
        })
        
        client.query("select isbn, price from book "
            + "where isbn " + inClause,
            Object.keys(payload.bookCount),
            (bookMapErr, bookMapData) => {
                if (bookMapErr) res.send("Error: " + bookMapErr);
                const total = bookMapData.rows.reduce((prev, curr, index) => prev + curr.price * payload.bookCount[curr.isbn],0);

                //Insert order in order relation
                Object.keys(payload.bookCount).forEach(key => {
                    client.query("insert into book_order values($1, $2, $3, 'warehouse', current_date, $4, $5, $6, $7)", 
                            [ nextOrdedNo, payload.email, key, payload.shipping_address, payload.billing_address, payload.bookCount[key], total ], 
                            (insertErr, insertData) => {
                            if(insertErr) res.send("Error: " + insertErr);
                            updateCounter++;
                            if (updateCounter >= Object.keys(payload.bookCount).length){
                                res.json({res: "Order completed with order number: " + nextOrdedNo});
                            }
                        });
                });
            }
        )
    });
});

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) res.status(404).send({error: "User not found"});
    client.query("select account_password from account where email = $1", [req.body.email], (err, data) => {
        if (data.rows.length && req.body.password === data.rows[0].account_password) res.json({res: "ok"});
        else res.json({res: "no"});
    });
});


router.get('/report/per-author', (req, res, next) => {    
    res.locals.query = `select author, sum(book.price * book_order.quantity) as sales
    from book, book_order
    where book.isbn = book_order.isbn
    group by author`;
    next();
});


router.get('/report/per-genre', (req, res, next) => {
    res.locals.query = `select genre, sum(book.price * book_order.quantity) as sales
    from book, book_order
    where book.isbn = book_order.isbn
    group by genre`;
    next();
});

router.get('/report/*', (req, res, next) => {
    const query = res.locals.query;
    client.query(query, (err, data) => {
        if (err) res.status(404).send("Error: " + err);
        res.json(data.rows);
    })
})

export default router;