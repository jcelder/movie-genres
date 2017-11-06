// const app = require('express')()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')
// 
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser)

app.use(session({
  name: 'session',
  keys: ['blablabla']
}))


app.use(express.static(__dirname + '/public'))
// 
app.set('view engine', 'pug')
// 
app.use('/', routes)
// 
app.use((req, res, next) => {
  const err = new Error('File not found')
  err.status = 404;
  next()
})


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

// 
// 
// 
app.listen(3000, () => {
  console.log('Application running on localhost:3000')
})
