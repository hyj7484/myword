const mysql = require('./mysql');
const express = require('express');
const app = express.Router();

app.post('/add', (req, res)=>{
  const kor = req.body.kor;
  const jp1 = req.body.jp1;
  const jp2 = req.body.jp2;
  const id = req.body.id;
  const wordbook = req.body.wordbook;
  if(id != null && wordbook != null){
    mysql.query(`insert into words(userid, kor, jp1, jp2, wordbook) values('${id}', '${kor}', '${jp1}', '${jp2}', '${wordbook}')`, (err, rows) => {
      if(err) throw err;
      else res.json(true);
    })
  }else{
    res.json(false);
  }
})

app.post('/get', (req, res) => {
  const wordbook  = req.body.wordbook;
  const id      = req.body.id;
  if(id != null && wordbook != null){
    mysql.query(`select id, kor, jp1, jp2 from words where userId = '${id}' and wordbook = '${wordbook}'`, (err, rows) => {
      if(err) throw err;
      else res.json(rows)
    })
  }
})

app.post('/delete', (req, res) => {
  const wordId = req.body.id;
  if(wordId != null){
    mysql.query(`delete from words where id = ${wordId}`, (err, row) => {
      if(err) throw err
      res.json(true)
    })
  }else{
    res.json(false)
  }
})

module.exports = app;
