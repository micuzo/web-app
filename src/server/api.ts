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
    const search = isNaN(req.params.search) ? req.params.search : parseInt(req.params.search);
    const values = [search];
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


    // ISBN: number,
    // publisherEmail: string,
    // title: string,
    // author: string,
    // genre: string,
    // pages: number,
    // price: number

    // "isbn": 3394,
    // "publisher_email": "tss@example.com",
    // "title": "The Hunger Games",
    // "author": "Suzanne Collins",
    // "genre": "Dystopian",
    // "pages": 374,
    // "price": 22,
    // "publisher_percentage": 23,
    // "quantity": 54



export default router;