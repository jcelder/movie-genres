const { db, pgp } = require('./db_connection')

const movieData = require('./movies.json')
const genreData = require('./genres.json')

async function loadData() {
  await Promise.all(genreData.map((genre) => {
    return db.none('INSERT INTO genres(id, name) VALUES($1, $2)', [genre.id, genre.name])
  }))
    .catch(err => console.error('genres', err.toString()))

  await Promise.all(movieData.map((movie) => {
    return db.one(`INSERT INTO movies(title, ratingAverage, releaseDate) VALUES
      ($1, $2, $3) RETURNING id`, [movie.title, movie.ratingAverage, movie.releaseDate])
      .then((movieID) => {
        movie.genreIDs.map((genreID) => {
          return db.none('INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)', [movieID.id, genreID])
        })
      })
  }))
    .catch(err => console.error('movies', err.toString()))


}


// loadData(() => pgp.end())
loadData().then(() => pgp.end())
