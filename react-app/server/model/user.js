const mysql = require('./mysql');
const express = require('express');
const app = express.Router();

// /user/sign/login => post
// login
app.post('/sign/login', (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;

  mysql.query(`select * from users where userid = '${id}' and userpw = '${pw}'`, (error, rows) => {
    if (error) throw error;
    res.json(rows[0] != null ? rows[0] : false );
  })
});

// sign up
app.post('/sign/add', (req, res) => {
  const id    = req.body.id;
  const pw    = req.body.pw;
  const name  = req.body.name;
  if( id != null && pw != null && name != null){
  mysql.query(`select * from users where userid = '${id}'`, (error, rows) => {
    if(rows.length == 0){
      mysql.query(`insert into users values('${id}', '${pw}', '${name}')`, (err, rows) => {
        res.json(true);
      });
    }else{
      res.json(false);
    }
  });
}else {
  res.json(false);
}
});

module.exports = app;
