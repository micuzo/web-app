import * as express from "express";
import * as path from "path";

const app = express();
const port = 3000;


app.use("/static", express.static("src/static"));
app.use("/static/js", express.static("js/client"));

app.get('/', (req, res) => {
    res.sendFile("src/static/login.html", {root: process.cwd()});
});

app.get('/home', (req, res) => {
    res.sendFile("src/static/home.html", {root: process.cwd()});
});

app.get('/home-admin', (req, res) => {
    res.sendFile("src/static/home-admin.html", {root: process.cwd()});
})

app.get('/catalog', (req, res) => {
    res.sendFile("src/static/catalog.html", {root: process.cwd()});
})

app.get('/reports', (req, res) => {
    res.sendFile("src/static/reports.html", {root: process.cwd()});
})

app.get('/cart', (req, res) => {
    res.sendFile("src/static/cart.html", {root: process.cwd()});
});

app.get('/orders', (req, res) => {
    res.sendFile("src/static/orders.html", {root: process.cwd()});
})


app.listen(port, () => {
    console.log("Now listening on port 3000");
});