const mysql = require('./mysql');
const express = require('express');
const app = express.Router();

app.post('/add', (req, res)=>{
  const kor = req.body.kor;
  const jp1 = req.body.jp1;
  const jp2 = req.body.jp2;
  const user = req.body.user;
  const wordbook = req.body.wordbook;
  if(user != null && wordbook != null){
    mysql.query(`insert into word(user, kor, jp1, jp2, wordbook) values('${user}', '${kor}', '${jp1}', '${jp2}', '${wordbook}')`, (err, rows) => {
      if(err) throw err;
      else res.json(true);
    })
  }else{
    res.json(false);
  }
})

app.post('/get', (req, res) => {
  const wordbook  = req.body.wordbook;
  const user      = req.body.user;
  if(user != null && wordbook != null){
    mysql.query(`select kor, jp1, jp2 from word where user = '${user}' and wordbook = '${wordbook}'`, (err, rows) => {
      if(err) throw err;
      else res.json(rows)
    })
  }
})

module.exports = app;
