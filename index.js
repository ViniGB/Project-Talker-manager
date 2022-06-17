const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const talkers = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Req 03
const createToken = () => crypto.randomBytes(8).toString('hex');

// Req 04
const authEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // Regex test taken from https://www.w3resource.com/javascript/form/email-validation.php
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

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const authName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const authAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const authTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const authWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const authRate1 = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!rate && rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

const authRate2 = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

// Req 06
app.put('/talker/:id',
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate1,
  authRate2,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const data = fs.readFileSync(talkers, 'utf8');
    const parsedTalkers = JSON.parse(data);
    const talkerId = parsedTalkers.findIndex((talker) => talker.id === Number(id));

    if (talkerId === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    parsedTalkers[talkerId] = {
      ...parsedTalkers[talkerId], name, age, talk: { watchedAt, rate },
    };
    fs.writeFileSync(talkers, JSON.stringify(parsedTalkers));
    res.status(200).json(parsedTalkers[talkerId]);
});

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

// Req 05
app.post('/talker',
  authToken,
  authName,
  authAge,
  authTalk,
  authWatchedAt,
  authRate1,
  authRate2,
  (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const data = fs.readFileSync(talkers, 'utf8');
    const parsedTalkers = JSON.parse(data);
    const id = parsedTalkers.length + 1;
    const newTalker = { id, name, age, talk: { watchedAt, rate } };
    parsedTalkers.push(newTalker);
    fs.writeFileSync(talkers, JSON.stringify(parsedTalkers));
    res.status(201).json(newTalker);
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
