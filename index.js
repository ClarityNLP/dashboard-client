const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use(express.static("client/build"));

app.get("/document_sources", (req, res) => {
    res.send("Doc Sources");
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
