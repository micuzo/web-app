"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var api_1 = require("./api");
var app = express();
var port = 3000;
var jsonParser = bodyParser.json();
app.use("/static", express.static("src/static"));
app.use("/static/js", express.static("js/client"));
app.get('/', function (req, res) {
    res.sendFile("src/static/login.html", { root: process.cwd() });
});
app.get('/home', function (req, res) {
    res.sendFile("src/static/home.html", { root: process.cwd() });
});
app.get('/home-admin', function (req, res) {
    res.sendFile("src/static/home-admin.html", { root: process.cwd() });
});
app.get('/catalog', function (req, res) {
    res.sendFile("src/static/catalog.html", { root: process.cwd() });
});
app.get('/reports', function (req, res) {
    res.sendFile("src/static/reports.html", { root: process.cwd() });
});
app.get('/cart', function (req, res) {
    res.sendFile("src/static/cart.html", { root: process.cwd() });
});
app.get('/orders', function (req, res) {
    res.sendFile("src/static/orders.html", { root: process.cwd() });
});
app.use('/api', jsonParser, api_1.default);
app.listen(port, function () {
    console.log("Now listening on port 3000");
});
