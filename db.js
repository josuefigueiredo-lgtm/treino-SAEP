const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    database: 'emprestimos',
    user: 'root',
    password: 'admin'
});

module.exports = pool.promise();