const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Test message please ignore')
})

module.exports = { router }
