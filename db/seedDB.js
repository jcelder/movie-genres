const { db, pgp } = require('./db_connection')

const movieData = require('./movies.json')
const genreData = require('./genres.json')

async function loadData() {
  await Promise.all(genreData.map((genre) => {
    return db.none('INSERT INTO genres(id, name) VALUES($1, $2)', [genre.id, genre.name])
  }))
    .catch(err => console.error('genres', err.toString()))

  await Promise.all(movieData.map(async (movie) => {
    const movieID = await db.one(`INSERT INTO movies(title, ratingAverage, releaseDate) VALUES
      ($1, $2, $3) RETURNING id`, [movie.title, movie.ratingAverage, movie.releaseDate])

    return Promise.all(movie.genreIDs.map((genreID) =>
      db.none('INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)', [movieID.id, genreID])
    ),
    )
  }))
    .catch(err => console.error('movies', err.toString()))
}

async function seedDB() {
  // Default Username: me@example.com Password: 1234
  await db.none(`INSERT INTO users(email, password) VALUES
  ('me@example.com','$2a$10$9tJUHEuDWkGBcnjwMNLo6.vmPt00CrjcuTY9f7DjiEND9IMRXt7AG')`)
  await db.none(`INSERT INTO favorites(user_id, movie_id) VALUES
    ('1','1'),
    ('1','14'),
    ('1','18'),
    ('1','34')`)
}
// loadData(() => pgp.end())
loadData()
  .then(() => seedDB())
  .then(() => pgp.end())
