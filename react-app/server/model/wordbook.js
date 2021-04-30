const mysql = require('./mysql');
const express = require('express');
const app = express.Router();

app.post('/addWordBook', (req, res) => {
   const id = req.body.id;
   const wordbook = req.body.wordbook;

   if(id != null && wordbook != ""){
     mysql.query(`insert into wordbooks(userId, wordbook) values(${id}, '${wordbook}')`, (err, rows) => {
       if(err) throw err;
       else res.json({wordbook : wordbook});
     })
   }else{
     res.json(false)
   }
})

app.post('/getWordBooks', (req, res) => {
  const id = req.body.id;
  if(id != null){
    mysql.query(`select wordbook, id from wordbooks where  userId = '${id}'`, (err, rows) => {
      if(err) throw err;
      console.log(rows)
      res.json(rows);
    })
  }else{
    res.json(false)
  }
})

app.post('/deleteWordBook', (req, res) => {
  const id = req.body.id;
  const wordbook = req.body.wordbook;
  if(id != null){
    mysql.query(`delete from wordbooks where userId = ${id} and wordbook = ${wordbook}`, (err, rows) => {
      if(err) throw err;
      mysql.query(`delte from words where userid = ${id} and wordbook = ${wordbook}`, (err, rows) => {
        if(err) throw err;
        res.json(true)
      })
    })
  }else{
    res.json(false)
  }
})

module.exports = app;
