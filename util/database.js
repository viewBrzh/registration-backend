const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'registration',
    password: '',
    waitForConnections: true,
    connectionLimit: 700,
    queueLimit: 0
});

// Export the pool
module.exports = pool.promise();
