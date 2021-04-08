const express = require('express');
const router = express.Router();


router.get('/a', (req, res) => {
  res.json({username : "bob"});
})
router.get('/', (req, res) => {
  res.json({username : "tom"});
})

module.exports = router;
