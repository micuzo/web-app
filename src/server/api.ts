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
    client.query("select title, author, book_order.quantity, order_location " 
        + "from book_order, book " 
        + "where book.isbn = book_order.isbn and order_number = $1", 
        [req.params.id], 
        (err, data) => {
            if (err) res.status(404).send("Error: " + err);
            res.json(data.rows);
        });
});



export default router;