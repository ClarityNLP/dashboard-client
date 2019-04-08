var WSS = require('ws').Server;
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const wss = new WSS({ port: process.env.DASHBOARD_API_CONTAINER_PORT });

getJobs = () => {
  const url = `http://${process.env.NLP_API_HOSTNAME}:${
    process.env.NLP_API_CONTAINER_PORT
  }/phenotype_jobs/ALL`;

  return axios
    .get(url)
    .then(response => {
      return {
        jobs: JSON.stringify(response.data)
      };
    })
    .catch(err => {
      return { jobs: JSON.stringify({ error: err.message }) };
    });
};

getJobStats = IDs => {
  const url = `http://${process.env.NLP_API_HOSTNAME}:${
    process.env.NLP_API_CONTAINER_PORT
  }/stats/${IDs}`;

  return axios
    .get(url)
    .then(response => {
      return { stats: JSON.stringify(response.data) };
    })
    .catch(err => {
      return { stats: JSON.stringify({ error: err.message }) };
    });
};

getJobPerformance = IDs => {
  const url = `http://${process.env.NLP_API_HOSTNAME}:${
    process.env.NLP_API_CONTAINER_PORT
  }/performance/${IDs}`;

  return axios
    .get(url)
    .then(response => {
      return { performance: JSON.stringify(response.data) };
    })
    .catch(err => {
      return { performance: JSON.stringify({ error: err.message }) };
    });
};

getLibrary = () => {
  const url = `http://${process.env.NLP_API_HOSTNAME}:${
    process.env.NLP_API_CONTAINER_PORT
  }/library`;

  return axios
    .get(url)
    .then(response => {
      return { library: JSON.stringify(response.data) };
    })
    .catch(err => {
      return { library: JSON.stringify({ error: err.message }) };
    });
};

getDocuments = () => {
  const url =
    `http://${process.env.NLP_SOLR_HOSTNAME}:${
      process.env.NLP_SOLR_CONTAINER_PORT
    }/solr/sample` +
    '/select?facet.field=source&facet=on&fl=facet_counts&indent=on&q=*:*&rows=1&wt=json';

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
      return { documents: JSON.stringify({ error: err.message }) };
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

      const jobs = JSON.parse(data.jobs);

      if (jobs.length > 0) {
        const IDs = jobs.map(job => {
          return job.nlp_job_id;
        });

        const statsCall = getJobStats(IDs);
        const performanceCall = getJobPerformance(IDs);

        return Promise.all([statsCall, performanceCall]).then(responses => {
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
        });
      } else {
        data.stats = JSON.stringify({});
        data.performance = JSON.stringify({});

        wss.clients.forEach(client => {
          client.send(JSON.stringify(data));
        });
      }
    })
    .catch(err => {
      console.log('ERROR: ' + err);
      wss.clients.forEach(client => {
        client.send(JSON.stringify(err));
      });
    });
};

wss.on('connection', socket => {
  const brodcastInterval = setInterval(broadcast, process.env.INTERVAL);

  socket.on('close', () => {
    clearInterval(brodcastInterval);
  });
});

console.log(
  `Server running at http://localhost:${
    process.env.DASHBOARD_API_CONTAINER_PORT
  }`
);
