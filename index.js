const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const util = require("util");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the ClarityNLP dashboard API!");
});

app.get("/document_sources", (req, res) => {
    const url =
        process.env.NLP_SOLR_URL +
        "/select?facet.field=source&facet=on&fl=facet_counts&indent=on&q=*:*&rows=1&wt=json";

    axios
        .get(url)
        .then(response => {
            const data = response.data;

            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get("/jobs", (req, res) => {
    const url = process.env.NLP_API_URL + "/phenotype_jobs/ALL";

    axios
        .get(url)
        .then(response => {
            const data = response.data;

            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get("/library", (req, res) => {
    const url = process.env.NLP_API_URL + "/library";

    axios
        .get(url)
        .then(response => {
            const data = response.data;

            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

app.post("/nlpql", (req, res) => {
    const url = process.env.NLP_API_URL + "/nlpql";
    const data = req.body.data;

    axios
        .post(url, data, {
            headers: {
                "Content-Type": "text/plain"
            }
        })
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.send(error);
        });
});

const port = process.env.DASHBOARD_API_CONTAINER_PORT;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
