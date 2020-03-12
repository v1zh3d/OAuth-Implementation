const mysql = require('mysql');

conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "oauth"
});
conn.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected to database!');
    }
});

module.exports = conn;