'use strict';

const mysql = require('mysql');

console.log('Get connection ...');

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "bongda",
    database: process.env.DB_NAME || "book_selling"
});

db.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

module.exports = db;
