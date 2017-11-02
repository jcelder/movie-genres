// const app = require('express')()
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
// 
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 
app.use(express.static(__dirname + '/public'))
// 
app.set('view engine', 'pug')
// 
app.use('/', routes)
// 
// app.use((req, res, next) => {
//   const err = new Error('File not found')
//   err.status = 404;
//   next()
// })
// 
// 
// 
// 
app.listen(3000, () => {
  console.log('Application running on localhost:3000')
})
