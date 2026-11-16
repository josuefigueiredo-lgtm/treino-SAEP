const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    database: 'josue',
    user: 'root',
    password: 'R.odrigo_18'
});

module.exports = pool.promise();