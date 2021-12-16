import * as express from "express";
import * as path from "path";

const app = express();
const port = 3000;


app.use("/static", express.static("src/static"));
app.use("/static/js", express.static("js/client"));

app.get('/', (req, res) => {
    res.sendFile("src/static/login.html", {root: process.cwd()});
});


app.listen(port, () => {
    console.log("Now listening on port 3000");
});