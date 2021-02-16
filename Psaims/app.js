var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
var fs = require("fs");
var moment = require("moment");
var app = express();

var dbConnection = require("./config/mysql");
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

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());

//Routes
//authentication controllers
let authController = require("./controller/auth");
//student controllers
let studentController = require("./controller/student");

//login route
// Login
app.get("/", (req, res) => {
  res.json({ message: "PSAIMS is running" });
});
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

// Teacher
app.get("/teachers", (req, res) => {
  try {
    dbConnection.query(
      "SELECT userName, firstName, middleName, lastName, avatar, gender, subject, subject.id, subject.name, class, class.id, class.name as className, year FROM teacher, subject, class WHERE teacher.subject=subject.id AND subject.class=class.id",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.get("/teacher/:username", (req, res) => {
  try {
    dbConnection.query(
      "SELECT * FROM teacher WHERE username='" + req.params.username + "'",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results.length === 0)
          res.status(404).send({ message: "Teacher not found" });
        else res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.post("/teacher", (req, res) => {
  let jointErr = 0;
  try {
    dbConnection.query(
      "INSERT INTO teacher(userName, firstName, middleName, lastName, avatar, gender, subject) VALUES('" +
        req.body.lastName +
        "','" +
        req.body.firstName +
        "','" +
        req.body.middleName +
        "','" +
        req.body.lastName +
        "', 'https://www.freeimages.com/photo/up-close-personal-2-1456672', '" +
        req.body.gender +
        "'," +
        req.body.subject +
        ")",
      (err, results, fields) => {
        if (err) jointErr++;
      }
    );
    dbConnection.query(
      "INSERT INTO users(username, password, role, lastModified) VALUES('" +
        req.body.lastName +
        "','" +
        req.body.lastName +
        "','teacher','" +
        moment().toISOString() +
        "')",
      (err, results, fields) => {
        if (err) jointErr++;
        console.log("Into users..." + err + results);
      }
    );
    jointErr === 0
      ? res
          .status(200)
          .send({ message: "Successfully added teacher " + req.body.lastName })
      : res
          .status(417)
          .send({ message: "Partially created teacher " + req.body.lastName });
  } catch (err) {
    console.log(err);
  }
});
app.put("/teacher/:username", (req, res) => {
  try {
    dbConnection.query(
      "UPDATE teacher SET firstName='" +
        req.body.firstName +
        "', middleName='" +
        req.body.middleName +
        "',lastName='" +
        req.body.lastName +
        "', avatar='" +
        req.body.avatar +
        "', gender='" +
        req.body.gender +
        "', subject=" +
        req.body.subject +
        " WHERE username='" +
        req.params.username +
        "'",
      (err, results, fields) => {
        if (err)
          res.status(417).send({ message: "Failed to edit teacher" + err });
        if (results)
          res.status(200).send({ message: "Seccessfully edited a teacher" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.delete("/teacher/:username", (req, res) => {
  try {
    let jointErr = 0;
    dbConnection.query(
      "DELETE FROM teacher WHERE username='" + req.params.username + "'",
      (err, results, fields) => {
        if (err) jointErr++;
      }
    );
    dbConnection.query(
      "DELETE FROM users WHERE username='" + req.params.username + "'",
      (err, results, fields) => {
        if (err) jointErr++;
      }
    );
    jointErr === 0
      ? res.status(200).send({
          message: "Successfully deleted teacher " + req.params.username,
        })
      : res.status(417).send({
          message:
            "Failed to delete teacher " + req.params.username + " successfully",
        });
  } catch (err) {
    console.log(err);
  }
});
app.listen(3000, () => {
  console.log("PSAIMS Running...");
});
