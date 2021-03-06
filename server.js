const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const app = express();

app.get('/', (req, res) => res.send('Hi'));

app.use(bodyParser.json());

axiosRetry(axios, { retries: 1 });

app.post('/batch', (req, res) => {
  const endpoint = req.body.endpoint;
  Promise.all(
    req.body.payloads.map(item => {
      const url = endpoint.url.replace(/{(\w+)}/g, (_, param) => item[param]);
      return axios({
        url: url,
        method: endpoint.verb,
        data: item.requestBody
      }).then(response => {
        return {
          status: response.status,
          data: response.data
        };
      }).catch(error => {
        return {
          status: error.response.status,
          data: error.response.statusText
        };
      });
    })
  ).then(response => {
    res.status(200).send(response);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));