const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./app');
// const cors = require('cors');

// app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);
const port = 3002;
app.listen(port, ()=>console.log(`Listening on port ${port}`))
