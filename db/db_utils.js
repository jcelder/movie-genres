const { db } = require('./db_connection')

const addUser = (email, hash) => {
  db.none('INSERT INTO users (email, password)VALUES ($1, $2)', [email, hash])
}

const getUser = (email) => {
  db.one('SELECT password FROM users WHERE email=$1 AND pass', [email])
}



module.exports = { addUser, getUser }
