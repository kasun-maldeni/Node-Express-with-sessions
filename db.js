// setting up database connection
const pg = require('pg')
let pool = new pg.Pool({
  database: 'test_db',
  username: 'kasun',
  password: 'test'
})

// making requests to the database
function run_sql(sql, values = [], cb) {
  pool.query(sql, values, (err, res) => {
    cb(res)
  })
}

module.exports = run_sql
