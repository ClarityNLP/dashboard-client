const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/document_sources", (req, res) => {
    const url =
        "http://18.220.133.76:8983/solr/sample/select?facet.field=source&facet=on&fl=facet_counts&indent=on&q=*:*&rows=1&wt=json";

    axios
        .get(url)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get("/jobs", (req, res) => {
    const url = "http://18.220.133.76:5000/phenotype_jobs/ALL";

    axios
        .get(url)
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send(err);
        });
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
