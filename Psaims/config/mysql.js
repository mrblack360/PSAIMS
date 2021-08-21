const mysql = require('mysql')

var dbConnection = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b84e11d16af9f5",
  password: "fe761177",
  database: "heroku_39e7fcacf83506d",
});

module.exports =  dbConnection;
