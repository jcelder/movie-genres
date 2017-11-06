const pgp = require('pg-promise')()

//delete these lines from production code 
const monitor = require('pg-monitor')
monitor.attach({})

const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///moviegenres_test'
  : 'postgres:///moviegenres'

const db = pgp(connection)

const closeConnection = () => {
  pgp.end()
}

module.exports = { db, pgp, closeConnection }
