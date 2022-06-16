const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const talkers = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// const user = {
//   email: 'email@email.com',
//   password: '123456',
// };

// Req 03
const createToken = () => crypto.randomBytes(8).toString('hex');

// Req 02
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(talkers, 'utf8');
  const findDataById = JSON.parse(data).find((talker) => talker.id === Number(id));

  if (!findDataById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(findDataById);
});

// Req 01
app.get('/talker', (_req, res) => {
  const data = fs.readFileSync(talkers, 'utf8');
  if (!data) return res.status(200).json([]);
  return res.status(200).json(JSON.parse(data));
});

// Req 03
app.post('/login', (req, res) => {
  // const { email, password } = req.body;
  const randomToken = createToken();
  res.status(200).json({ token: randomToken });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
