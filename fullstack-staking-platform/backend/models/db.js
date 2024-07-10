const sql = require('mssql');
const config = require('../config');

const poolPromise = new sql.ConnectionPool(config.db)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.error('Database Connection Failed - error:', err));

module.exports = {
  sql, poolPromise
};
