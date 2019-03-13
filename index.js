var WSS = require("ws").Server;
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const wss = new WSS({ port: process.env.DASHBOARD_API_CONTAINER_PORT });

console.log(
    `Server running at http://localhost:${
        process.env.DASHBOARD_API_CONTAINER_PORT
    }`
);

wss.on("connection", socket => {
    broadcast();
});

getJobs = () => {
    const url = process.env.NLP_API_URL + "/phenotype_jobs/ALL";

    return axios
        .get(url)
        .then(response => {
            return { jobs: JSON.stringify(response.data) };
        })
        .catch(err => {
            return { jobs: { error: err.message } };
        });
};

getLibrary = () => {
    const url = process.env.NLP_API_URL + "/library";

    return axios
        .get(url)
        .then(response => {
            return { library: JSON.stringify(response.data) };
        })
        .catch(err => {
            return { library: { error: err.message } };
        });
};

getDocuments = () => {
    const url =
        process.env.NLP_SOLR_URL +
        "/select?facet.field=source&facet=on&fl=facet_counts&indent=on&q=*:*&rows=1&wt=json";

    return axios
        .get(url)
        .then(response => {
            return {
                documents: JSON.stringify(
                    response.data.facet_counts.facet_fields.source
                )
            };
        })
        .catch(err => {
            return { documents: { error: err.message } };
        });
};

const broadcast = () => {
    const jobCall = getJobs();
    const libraryCall = getLibrary();
    const docsCall = getDocuments();

    Promise.all([jobCall, libraryCall, docsCall])
        .then(responses => {
            const data = {};

            for (let i = 0; i < responses.length; i++) {
                let obj = responses[i];
                let entries = Object.entries(obj)[0];
                let key = entries[0];
                let value = entries[1];

                data[key] = value;
            }

            wss.clients.forEach(client => {
                client.send(JSON.stringify(data));
            });
        })
        .catch(err => {
            console.log("ERROR: " + err);
            wss.clients.forEach(client => {
                client.send(JSON.stringify(err));
            });
        });
};

setInterval(broadcast, process.env.INTERVAL);
