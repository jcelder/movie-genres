const pgp = require('pg-promise')()

const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///moviegenres_test'
  : 'postgres:///moviegenres'

const db = pgp(connection)

module.exports = { db, pgp }
