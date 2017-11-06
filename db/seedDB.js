const { db, pgp } = require('./db_connection')

const movieData = require('./movies.json')
const genreData = require('./genres.json')

async function loadData() {
  await Promise.all(movieData.map((movie) => {
    return db.none(`INSERT INTO movies(title, ratingAverage, releaseDate, genreIDs) VALUES
      ($1, $2, $3, $4)`, [movie.title, movie.ratingAverage, movie.releaseDate, movie.genreIDs])
  }))
    .catch(err => console.error('movies', err.toString()))

  await Promise.all(genreData.map((genre) => {
    return db.none('INSERT INTO genres(id, name) VALUES($1, $2)', [genre.id, genre.name])
  }))
    .catch(err => console.error('genres', err.toString()))
}


// loadData(() => pgp.end())
loadData().then(() => pgp.end())
