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

// Req 04
const authEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

const authPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

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
app.post('/login', authEmail, authPassword, (_req, res) => {
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
