const { db } = require('./db_connection')

const addUser = (email, hash) => {
  return db.none('INSERT INTO users (email, password)VALUES ($1, $2)', [email, hash])
}

const getUser = (email) => {
  return db.one('SELECT password FROM users WHERE email=$1 AND pass', [email])
}

const getMovies = () => {
  return db.any('SELECT title FROM movies ORDER BY title')
}


module.exports = { addUser, getUser, getMovies }
