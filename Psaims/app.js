var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");
var moment = require("moment");
var app = express();

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
app.use(cors());
var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "psaims",
});
dbConnection.connect();

//Routes
// Login
app.get("/", (req, res) => {
  res.json({ message: "PSAIMS is running" });
});
app.get("/login", (req, res) => {
  res.json({ message: "Welcomee" });
});
app.post("/login", (req, res) => {
  let u = { username: req.body.username, password: req.body.password };
  try {
    dbConnection.query(
      "SELECT COUNT(username) as userCount, username, password, role from users WHERE username='" +
        u.username +
        "' LIMIT 1",
      (err, results, fields) => {
        if (err) console.log(err);
        if (!results[0].userCount == 0) {
          let resultsData = results[0];
          if (
            u.username == resultsData.username &&
            u.password == resultsData.password
          ) {
            fs.writeFile(
              "src/app/shared/global-variable.ts",
              "export const user = {username: '" +
                resultsData.username +
                "', role: '" +
                resultsData.role +
                "'};",
              (err, result) => {
                if (err) console.log("Failed to log in...");
              }
            );
            res.json({
              username: resultsData.username,
              role: resultsData.role,
            });
          } else
            res.status(403).send({ message: "Username or Password missmatch" });
        } else {
          res.status(404).send({ message: "User not found!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
// logout
app.get("/logout", (req, res) => {
  fs.writeFile(
    "src/app/shared/global-variable.ts",
    "export const user = {username: '', role: ''};",
    (err, result) => {
      if (err) console.log("Failed to log out");
    }
  );
  res.json({ message: "Logged Out Successfully" });
});
// Students
app.get("/students", (req, res) => {
  try {
    dbConnection.query(
      "SELECT * FROM student, class WHERE student.class=class.id",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.get("/student/:id", (req, res) => {
  try {
    dbConnection.query(
      "SELECT * FROM student where id=" + req.params.id,
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results.length === 0)
          res.status(404).send({ message: "Student not found" });
        else res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.post("/student", (req, res) => {
  try {
    dbConnection.query(
      "INSERT INTO student(firstName, middleName, lastName, gender, class) VALUES('" +
        req.body.firstName +
        "','" +
        req.body.middleName +
        "','" +
        req.body.lastName +
        "','" +
        req.body.gender +
        "'," +
        req.body.class +
        ")",
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to add student" });
        if (results)
          res.status(200).send({ message: "Seccessfully Added One Student" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.put("/student/:id", (req, res) => {
  try {
    dbConnection.query(
      "UPDATE student SET firstName='" +
        req.body.firstName +
        "', middleName='" +
        req.body.middleName +
        "',lastName='" +
        req.body.lastName +
        "', gender='" +
        req.body.gender +
        "', class=" +
        req.body.class +
        " WHERE id=" +
        req.params.id,
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to edit Student" });
        if (results)
          res.status(200).send({ message: "Seccessfully edited a Student" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.delete("/student/:id", (req, res) => {
  try {
    dbConnection.query(
      "DELETE FROM student WHERE id=" + req.params.id,
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to delete student" });
        if (results) res.status(200).send({ message: "Successfully Deleted" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// Teacher
app.get("/teachers", (req, res) => {
  try {
    dbConnection.query(
      "SELECT * FROM teacher, subject, class WHERE teacher.subject=subject.id AND subject.class=class.id",
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
    dbConnection.query(
      "DELETE FROM teacher WHERE username='" + req.params.username + "'",
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to delete teacher" });
        if (results) res.status(200).send({ message: "Successfully teacher" });
      }
    );
    dbConnection.query(
      "DELETE FROM users WHERE username='" + req.params.username + "'",
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to delete user" });
        if (results) res.status(200).send({ message: "Successfully user" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});
app.listen(3000, () => {
  console.log("PSAIMS Running...");
});
