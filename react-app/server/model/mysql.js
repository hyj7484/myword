const mysql = require('mysql');
const connect = mysql.createConnection({
  host : '54.180.128.151',
  user : 'root',
  password : 'dydwn159',
  database : 'word'
});
/*
  Table users
  id varchar primary key
  pw varchar not null default 1
  name varchar

  Table word
  id int primary auto_increment
  user varchar
  kor varchar < 한글 >
  jp1 varchar < 한자 >
  jp2 varchar < 요미가나 >
*/
connect.connect();

module.exports = connect;
