const mysql = require('mysql')

var dbConnection = mysql.createConnection({
  host: "sql5.freemysqlhosting.net",
  user: "sql5419698",
  password: "McdByWYmnW",
  database: "sql5419698",
});

module.exports =  dbConnection;
