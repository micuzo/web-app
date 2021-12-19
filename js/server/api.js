"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var pg_1 = require("pg");
var fs = require("fs");
var router = express.Router();
var dbConfig = JSON.parse(fs.readFileSync(process.cwd() + '/postgres.json', 'utf-8'));
var client = new pg_1.Client(dbConfig);
client.connect();
router.get('/book', function (req, res, next) {
    client.query('select isbn, publisher_name, title, author, genre, pages, price, quantity from book natural join publisher', function (err, data) {
        res.locals.err = err;
        res.locals.data = data.rows;
        next();
    });
});
router.get('/book/:search', function (req, res, next) {
    var where = isNaN(req.params.search) ? "where title = $1 or author = $1 or genre = $1" : "where isbn = $1";
    var text = "select isbn, publisher_name, title, author, genre, pages, price, quantity from book natural join publisher " + where;
    var values = [req.params.search];
    client.query(text, values, function (err, data) {
        res.locals.err = err;
        res.locals.data = data.rows;
        next();
    });
});
router.get('/book*', function (req, res) {
    if (res.locals.err)
        res.status(404).send("Error: " + res.locals.err);
    var booksForFE = res.locals.data.map(function (book) { return ({
        ISBN: book.isbn,
        publisher: book.publisher_name,
        title: book.title,
        author: book.author,
        genre: book.genre,
        pages: book.pages,
        price: book.price,
        quantity: book.quantity
    }); });
    res.json(booksForFE);
});
router.get('/order/:id', function (req, res, next) {
    client.query("select title, author, book_order.quantity, order_location, price, total "
        + "from book_order, book "
        + "where book.isbn = book_order.isbn and order_number = $1", [req.params.id], function (err, data) {
        if (err)
            res.status(404).send("Error: " + err);
        res.json(data.rows);
    });
});
router.post('/order', function (req, res) {
    //Get next order_number
    client.query("select max(order_number) from book_order", function (err, data) {
        if (err)
            res.send("Error: " + err);
        var nextOrdedNo = data.rows[0].max + 1;
        //Get price map to compute total
        var payload = req.body;
        var updateCounter = 0;
        var inClause = "in (";
        Object.keys(payload.bookCount).forEach(function (isbn, index) {
            var last = index >= Object.keys(payload.bookCount).length - 1;
            inClause += !last ? "$".concat(index + 1, ", ") : "$".concat(index + 1, ")");
        });
        client.query("select isbn, price from book "
            + "where isbn " + inClause, Object.keys(payload.bookCount), function (bookMapErr, bookMapData) {
            if (bookMapErr)
                res.send("Error: " + bookMapErr);
            var total = bookMapData.rows.reduce(function (prev, curr, index) { return prev + curr.price * payload.bookCount[curr.isbn]; }, 0);
            //Insert order in order relation
            Object.keys(payload.bookCount).forEach(function (key) {
                client.query("insert into book_order values($1, $2, $3, 'warehouse', current_date, $4, $5, $6, $7)", [nextOrdedNo, payload.email, key, payload.shipping_address, payload.billing_address, payload.bookCount[key], total], function (insertErr, insertData) {
                    if (insertErr)
                        res.send("Error: " + insertErr);
                    updateCounter++;
                    if (updateCounter >= Object.keys(payload.bookCount).length) {
                        res.json({ res: "Order completed with order number: " + nextOrdedNo });
                    }
                });
            });
        });
    });
});
router.post('/login', function (req, res) {
    if (!req.body.email || !req.body.password)
        res.status(404).send({ error: "User not found" });
    client.query("select account_password from account where email = $1", [req.body.email], function (err, data) {
        if (data.rows.length && req.body.password === data.rows[0].account_password)
            res.json({ res: "ok" });
        else
            res.json({ res: "no" });
    });
});
router.get('/report/per-author', function (req, res, next) {
    res.locals.query = "select author, sum(book.price * book_order.quantity) as sales\n    from book, book_order\n    where book.isbn = book_order.isbn\n    group by author";
    next();
});
router.get('/report/per-genre', function (req, res, next) {
    res.locals.query = "select genre, sum(book.price * book_order.quantity) as sales\n    from book, book_order\n    where book.isbn = book_order.isbn\n    group by genre";
    next();
});
router.get('/report/*', function (req, res, next) {
    var query = res.locals.query;
    client.query(query, function (err, data) {
        if (err)
            res.status(404).send("Error: " + err);
        res.json(data.rows);
    });
});
exports.default = router;
