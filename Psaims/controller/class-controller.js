var dbConnection = require("../config/mysql");
var moment = require("moment");

//get a Class
exports.getOneClass = (req, res) => {
  const { id } = req.params;
  try {
    dbConnection.query(
      "SELECT * FROM class where id=?",
      [id],
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results.length === 0)
          res.status(404).send({ message: "Class not found" });
        else res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// get all Classs
exports.getAllClasses = (req, res) => {
  try {
    dbConnection.query(
      "SELECT id, name, teacher, year, students, class, studentsCount, userName, firstName, middleName, lastName FROM (SELECT class.id, name, teacher, year, student.id as students, class, COUNT(DISTINCT student.id) as studentsCount FROM class, student WHERE class.id=student.class GROUP BY class.id) AS class_students LEFT JOIN teacher ON class_students.teacher=teacher.userName ORDER BY name",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" + err });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//add Class
exports.addClass = (req, res) => {
  const { name, teacher } = req.body;
  try {
    dbConnection.query(
      "INSERT INTO class (name, teacher,  year) VALUES (?, ?, ?)",
      [name, teacher, moment().year()],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to add Class" });

        if (results)
          res.status(200).send({ message: "Seccessfully added a Class" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//delete Class
exports.deleteClass = (req, res) => {
  const { id } = req.params.id;
  try {
    dbConnection.query(
      "DELETE FROM class WHERE id=?",
      [id],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to delete Class" });
        if (results) res.status(200).send({ message: "Successfully Deleted" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.updateClass = (req, res) => {
  const { name, teacher, year } = req.body;
  const { id } = req.params;

  try {
    dbConnection.query(
      "UPDATE class SET name=?, teacher=?, year=? WHERE id=" + id,
      [name, teacher, year],
      (err, results, fields) => {
        if (err)
          res.status(417).send({ message: "Failed to edit Class" + err });
        if (results)
          res.status(200).send({ message: "Seccessfully edited a Class" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
