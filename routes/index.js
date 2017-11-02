const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;
const bodyParser = require('body-parser')
// 
// 
router.get('/', (req, res) => {
  res.send('Test message please ignore')
})
// 
// module.exports = { router }
module.exports = router;