const express = require('express');
const app = express();

const naverApi = require('./naverAPI/papago');
const user = require('./model/user');
const word = require('./model/word');
const wordbook = require('./model/wordbook');

app.get('/a', (req, res) => {
  res.json({username : "bob"});
})
app.get('/', (req, res) => {
  res.json({username : "tom"});
})
app.use('/user', user);
app.use('/word', word);
app.use('/wordbook', wordbook);
app.use('/naverapi', naverApi);

module.exports = app;
