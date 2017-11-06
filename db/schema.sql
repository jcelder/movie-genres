CREATE TABLE movies(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  ratingAverage REAL NOT NULL,
  releaseDate DATE NOT NULL,
  genreIDs INT ARRAY
);

CREATE TABLE genres(
  id INT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  sessionID TEXT UNIQUE
);

CREATE TABLE favorites(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL
);
