const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkers = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Req 01
app.get('/talker', (_req, res) => {
  const data = fs.readFileSync(talkers, 'utf8');
  if (!data) return res.status(200).json([]);
  return res.status(200).json(JSON.parse(data));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
