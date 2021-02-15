var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require('express-session');
var fs = require("fs");
var app = express();

var dbConnection = require('./config/mysql');
// db.

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(cors());


//Routes
//authentication controllers
let authController = require('./controller/auth');
//student controllers
let studentController = require('./controller/student');


//login route
app.get("/login", (req, res) => {
  res.json({ message: "Welcome" });
});

//default landing page
app.get("/", (req, res) => {
  res.json({ message: "Signin or Login" });
});

//authentication api/routes
app.post("/api/login", authController.login);
app.get("/api/logout", authController.logout);

// Students api/routes
app.post("/student", studentController.addStudent);
app.get("/students", studentController.getAllStudents);
app.get("/student/:id", studentController.getOneStudent);
app.delete("/student/:id", studentController.deleteStudent);
app.put("/student/:id", studentController.updateStudent);


app.listen(3000, () => {
  console.log("PSAIMS Running...");
});
