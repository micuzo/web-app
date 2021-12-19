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
    client.query("select max(order_number) from book_order", (err, data) => {
        if (err) res.send("Error: " + err);
        const nextOrdedNo = data.rows[0].max + 1;
        // email: user.email,
        // bookCount: countByISBN,
        // shipping_address: JSON.stringify(shippingForm),
        // billing_address: JSON.stringify(billingForm)
        //(<next_order_number>, <user_email>, <ISBN>, <order_location>, issue_date, <shipping_address>, <billing_address>, <quantity>, <total>);
        const payload = req.body;
        let updateCounter = 0;
        Object.keys(payload.bookCount).forEach(key => {
            client.query("insert into book_order values($1, $2, $3, 'warehouse', current_date, $4, $5, $6, $7)", 
                [
                    nextOrdedNo, payload.email, key, payload.shipping_address, payload.billing_address, payload.bookCount[key], -1 //total not implemented yet
                ], (insertErr, insertData) => {
                    if(insertErr) res.send("Error: " + insertErr);
                    updateCounter++;
                    if (updateCounter >= Object.keys(payload.bookCount).length){
                        res.json({res: "Order completed with order number: " + nextOrdedNo});
                    }
                });
        });
    });
});

router.post('/login', (req, res) => {
    client.query("select account_password from account where email = $1", [req.body.email], (err, data) => {
        if (req.body.password === data.rows[0].account_password) res.json({res: "ok"});
        else res.json({res: "no"});
    });
})



export default router;