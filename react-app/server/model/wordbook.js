const mysql = require('./mysql');
const express = require('express');
const app = express.Router();

app.post('/addWordBook', (req, res) => {
   const user = req.body.user;
   const wordbook = req.body.wordbook;

   if(user != null && wordbook != null){
     mysql.query(`insert into wordbook(user, wordbook) values('${user}', '${wordbook}')`, (err, rows) => {
       if(err) throw err;
       else res.json(true);
     })
   }else{
     res.json(false)
   }
})

app.post('/getWordBooks', (req, res) => {
  const user = req.body.user;
  if(user != null){
    mysql.query(`select wordbook from wordbook where user = '${user}'`, (err, rows) => {
      res.json(rows);
    })
  }else{
    res.json(false)
  }
})

module.exports = app;
