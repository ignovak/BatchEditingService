const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => res.send('Hi'));

app.use(bodyParser.json());

app.post('/batch', (req, res) => {
  const endpoint = req.body.endpoint;
  Promise.all(
    req.body.payload.map(item => {
      const url = endpoint.url + '/' + item.userId;
      return axios({
        url: url,
        method: endpoint.verb,
        data: item.requestBody
      }).then(response => {
        return response.data;
      }).catch(error => {
        console.error(error.status);
      });
    })
  ).then(response => {
    res.status(200).send(response);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));