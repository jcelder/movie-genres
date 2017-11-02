const app = require('express')()
const bodyParser = require('body-parser')

const routes = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/', routes)


app.listen(3000, () => {
  console.log('Application running on localhost:3000')
})
