const { Pool } = require("pg");
require

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
})

console.log(process.env.DB_USERNAME)
console.log(process.env.DATABASE)


module.exports = pool;