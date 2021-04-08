const mysql = require('mysql');
const connect = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'dydwn159',
  database : 'word'
})

connect.connect();

module.export = connect;
