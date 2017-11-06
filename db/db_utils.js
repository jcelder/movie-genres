const { db } = require('./db_connection')

const addUser = (email, hash, sessionID) => {
  return db.one('INSERT INTO users (email, password, sessionID) VALUES ($1, $2, $3) RETURNING users.email', [email, hash, sessionID])
}

const getUser = (email) => {
  return db.one('SELECT * FROM users WHERE email=$1', [email])
}

const getMovies = () => {
  return db.any('SELECT movies.title FROM movies ORDER BY movies.title')
}

const addFavorite = async (email, movieTitle) => {
  const userID = await db.one('SELECT users.id FROM users WHERE users.email=$1', [email])
  const movieID = await db.one('SELECT movies.id FROM movies WHERE movies.title=$1', [movieTitle])
  return db.none('INSERT INTO favorites(user_id, movie_id) VALUES($1, $2)', [userID, movieID])
}

module.exports = { addUser, getUser }
