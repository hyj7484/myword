const express = require('express');
const router = express.Router();

router.get('/a/:num/:t', (req, res) => {
  console.log(req.params);
  res.send({greeting : 'Hello React x Node.js'});
})

module.exports = router;
