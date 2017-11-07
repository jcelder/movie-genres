

const { db } = require('./db_connection')

const addUser = (email, hash) => {
  return db.one('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING users.email', [email, hash])
}

const getUser = (email) => {
  return db.one('SELECT * FROM users WHERE email=$1', [email])
}

const getMovies = () => {
  return db.any('SELECT movies.title FROM movies ORDER BY movies.title')
}

const getFavorites = (email) => {
  return db.any(`SELECT movies.title FROM movies JOIN favorites ON movies.id = favorites.movie_id JOIN
     users ON favorites.user_id = users.id WHERE users.email = $1`, [email])
}

const addFavorite = async (email, movieTitle) => {
  const userID = await db.one('SELECT users.id FROM users WHERE users.email=$1', [email])
  const movieID = await db.one('SELECT movies.id FROM movies WHERE movies.title=$1', [movieTitle])
  return db.none('INSERT INTO favorites(user_id, movie_id) VALUES($1, $2)', [userID, movieID])
}

module.exports = { addUser, getUser, getMovies, getFavorites }
