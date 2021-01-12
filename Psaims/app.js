var http = require("http");

var mysql = require("mysql");
express = require("express");

var databaseConf = require("./nodejs/database/conf");

var con = mysql.createConnection(databaseConf);

con.connect(function (err) {
  if (err) throw err;
  console.log("Database Server  Connected!");
  try {
    con.query("CREATE DATABASE psaims", function (err, result) {
      if (err) console.log("PSAIMS arleady exists");
    });
  } catch (e) {
    console.log(e);
  }
});

var server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Server is On</h1>");
  console.log("Listening at port 3000");
});

server.listen(3000, "localhost");
