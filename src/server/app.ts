import * as express from "express";

const app = express();
const port = 3000;


app.use("/static", express.static("src/static"));
app.use("/static/js", express.static("js/client"));

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log("Now listening on port 3000");
});