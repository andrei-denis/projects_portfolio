const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"projects_portfolio" 
})

module.exports = db;
