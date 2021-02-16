const mysql = require('mysql')

var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psaims",
});

module.exports =  dbConnection;
