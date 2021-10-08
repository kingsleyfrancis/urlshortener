const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ShortenerService = require('./src/ShortenerService');


const app = express();
const port = process.env.PORT || 8080;
const jsonParser = bodyParser.json();

//enable all cors
app.use(cors());

app.get('/api/statistic', (req, res) => {
  let response = ShortenerService.getAll();

  res.setHeader('Content-Type', 'application/json');
  res.json(response);
});

app.post('/api/encode', jsonParser, (req, res) => {
  let url = req.body.url;
  
  let response = ShortenerService.shortenUrl(url);

  res.setHeader('Content-Type', 'application/json');
  res.json(response);
});

app.get('/api/decode/:shortId', (req, res) => {
  let shortId = req.params.shortId;

  let response = ShortenerService.getUrl(shortId);

  res.setHeader('Content-Type', 'application/json');
  res.json(response);
});


app.delete('/api/remove/:shortId', (req, res) => {
  let shortId = req.params.shortId;

  let response = ShortenerService.remove(shortId);

  res.setHeader('Content-Type', 'application/json');
  res.json(response);
});


module.exports = app.listen(port, () => {
  console.log(`Url shortener api listening on port ${port}!`)
});
