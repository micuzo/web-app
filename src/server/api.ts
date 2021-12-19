import * as express from "express";
import { Pool, Client } from "pg";
import * as fs from "fs";

const router = express.Router();
const dbConfig = JSON.parse(fs.readFileSync(process.cwd() + '/postgres.json', 'utf-8'));

const client = new Client(dbConfig);
client.connect();



router.get('/book', (req, res) => {
    client.query('select * from book', (err, data) => {
        if (err) res.status(404).send("Error: " + err);
        res.json(data.rows);
    });
});

router.get('/book/:search', (req, res) => {
    const where = isNaN(req.params.search) ? "where title = $1 or author = $1 or genre = $1" : "where isbn = $1";
    const text = "select * from book " + where;
    const search = isNaN(req.params.search) ? req.params.search : parseInt(req.params.search);
    const values = [search];
    client.query(text, values, (err, data) => {
        if (err) res.status(404).send("Error: " + err);
        res.json(data.rows);
    });
});



export default router;