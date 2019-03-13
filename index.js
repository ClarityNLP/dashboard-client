var WSS = require("ws").Server;
const axios = require("axios");

const wss = new WSS({ port: 8750 });

wss.on("connection", socket => {
    broadcast();
});

getJobs = () => {
    const url = "http://localhost:5000/phenotype_jobs/ALL";

    return axios
        .get(url)
        .then(response => {
            return { jobs: JSON.stringify(response.data) };
        })
        .catch(err => {
            return { jobs: err.message };
        });
};

getLibrary = () => {
    const url = "http://localhost:5000/library";

    return axios
        .get(url)
        .then(response => {
            return { library: JSON.stringify(response.data) };
        })
        .catch(err => {
            return { library: err.message };
        });
};

getDocuments = () => {
    const url =
        "http://localhost:8983/solr/sample/select?facet.field=source&facet=on&fl=facet_counts&indent=on&q=*:*&rows=1&wt=json";

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
            return { documents: err.message };
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

setInterval(broadcast, 500);
