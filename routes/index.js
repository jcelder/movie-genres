const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;
const bodyParser = require('body-parser')
// 
const {addUser, getUser, getMovies} = require('../db/db_utils');


router.get('/', (req, res) => {
  return res.render('index', {
    email: req.session.userID
  })
})

//signup page - GET 
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    error: '',
    email: req.session.userID
  })
})

//signup page - POST 
router.post('/signup', (req, res) => {
  const {
    email,
    password
  } = req.body 
  
  if(!(email || password)) {
    res.render('signup', {
      title: 'Sign Up',
      error: 'Please provide email and password to sign up'
    })
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      addUser(email, hash)
        .then(user => {
          req.session.userID = user.email;
          res.redirect('/')
        })
        .catch(err => {
          res.render('signup', {
            title: 'Sign Up',
            error: 'Could not add user to db'
          })
        })
    })
  }
})

//loging page - GET 
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Log In',
    error: '',
    email: req.session.userID
  })
})

//login page - POST 
router.post('/login', (req, res) => {
  const {
    email,
    password 
  } = req.body 
  if(!(email || password)) {
    res.render('login', {
      title: 'Log In',
      error: 'Please provide email and password to log in'
    })
  } else {
    getUser(email, password)
      .then(data => {
        bcrypt.compare(password, data.password)
        .then(result => {
          if(result) {
            req.session.userID = data.email,
            res.redirect('/')
          } else {
            res.render('login', {
              title: 'Log In',
              error: 'Wrong password or email, try again'
            })
          }
        })
      })
      .catch(err => {
        res.render('login', {
          title: 'Log In',
          error: 'Could not find this user in db'
        })
      })
  }
})









// module.exports = { router }
module.exports = router;