
/* loading and initialising the library */
const pgp = require('pg-promise')()

/* Connection string */
const connection = 'postgres://saurabh:12345678@localhost:5432/mrcoffee'

/* Creating new database instance */
const db = pgp(connection)

/* Export it anywhere you want to use it */
module.exports = db