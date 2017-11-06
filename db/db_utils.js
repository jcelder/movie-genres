const { db } = require('./db_connection')

const addUser = (email, hash) => {
  return db.one('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hash])
}

const getUser = (email) => {
  return db.one('SELECT * FROM users WHERE email=$1', [email])
}





module.exports = { addUser, getUser, }
