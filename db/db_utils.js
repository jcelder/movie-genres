

const { db } = require('./db_connection')

const addUser = (email, hash) => {
  return db.one('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING users.email', [email, hash])
}

const getUser = (email) => {
  return db.one('SELECT * FROM users WHERE email=$1', [email])
}

const getDetailedMovieInfo = (title) => {
  return db.one(`SELECT movies.title, movies.ratingAverage, movies.releaseDate, string_agg(genres.name, ', ') as Genres
      FROM movies JOIN movie_genres ON movies.id = movie_genres.movie_id
      JOIN genres ON movie_genres.genre_id = genres.id WHERE movies.title=$1
      GROUP BY movies.title, movies.ratingAverage, movies.releaseDate`, [title])
}

const getMovies = () => {
  return db.any('SELECT movies.title FROM movies ORDER BY movies.title')
}

const getFavorites = (email) => {
  return db.any(`SELECT movies.title FROM movies JOIN favorites ON movies.id = favorites.movie_id JOIN
     users ON favorites.user_id = users.id WHERE users.email = $1`, [email])
}

const movieFavoriteCheck = async (email, movieTitle, releaseDate) => {
  const userID = await db.one('SELECT users.id FROM users WHERE users.email=$1', [email])
  const movieID = await db.one('SELECT movies.id FROM movies WHERE movies.title=$1 AND movies.releaseDate=$2', [movieTitle, releaseDate])
  return db.oneOrNone('SELECT id FROM favorites WHERE user_id=$1 AND movie_id=$2', [userID, movieID])
}

const addFavorite = async (email, movieTitle, releaseDate) => {
  const userID = await db.one('SELECT users.id FROM users WHERE users.email=$1', [email])
  const movieID = await db.one('SELECT movies.id FROM movies WHERE movies.title=$1 AND movies.releaseDate=$2', [movieTitle, releaseDate])
  return db.none('INSERT INTO favorites(user_id, movie_id) VALUES($1, $2)', [userID, movieID])
}

const deleteFavorite = async (email, movieTitle, releaseDate) => {
  const userID = await db.one('SELECT users.id FROM users WHERE users.email=$1', [email])
  const movieID = await db.one('SELECT movies.id FROM movies WHERE movies.title=$1 AND movies.releaseDate=$2', [movieTitle, releaseDate])
  return db.none('DELETE FROM favorites WHERE user_id=$1 AND movie_id=$2', [userID, movieID])
}

module.exports = {
  addUser,
  getUser,
  getMovies,
  getFavorites,
  getDetailedMovieInfo,
  addFavorite,
  movieFavoriteCheck,
  deleteFavorite,
}
