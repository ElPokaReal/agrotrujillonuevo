const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
    user:process.env.DBUSER,
    password:process.env.DBPASS,
    host:process.env.DBHOST,
    port:process.env.DBPORT,
    database:process.env.DBBD,
})

module.exports = pool;