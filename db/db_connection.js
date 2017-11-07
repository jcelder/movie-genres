const pgp = require('pg-promise')()

const pg_options = {}
// delete these lines from production code
const monitor = require('pg-monitor')
monitor.attach(pg_options)

const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test'
    ? 'moviegenres_test'
    : 'moviegenres',
}


const db = pgp(connectionOptions)


const closeConnection = () => {
  pgp.end()
}

module.exports = { db, pgp, closeConnection }
