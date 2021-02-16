var dbConnection = require("../../config/mysql");

//add student
exports.addStudent = (req, res) => {
  const { firstName, middleName, lastName, gender } = req.body;
  try {
    dbConnection.query(
      "INSERT INTO student (firstName, middleName, lastName, gender, class) VALUES (?, ?, ?, ?, ?)",
      [firstName, middleName, lastName, gender, req.body.name],
      (err, results, fields) => {
        if (err)
          res.status(417).send({ message: "Failed to add student" + results });
        if (results)
          res.status(200).send({ message: "Seccessfully added a student" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//delete student
exports.deleteStudent = (req, res) => {
  const { id } = req.body;
  try {
    dbConnection.query(
      "DELETE FROM student WHERE id=?",
      [id],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to delete student" });
        if (results) res.status(200).send({ message: "Successfully Deleted" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//get a student
exports.getOneStudent = (req, res) => {
  const { id } = req.params;
  try {
    dbConnection.query(
      "SELECT * FROM student where id=?",
      [id],
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
};

// get all students
exports.getAllStudents = (req, res) => {
  try {
    dbConnection.query(
      "SELECT student.id as id, firstName, middleName, lastName, gender, class, class.id as classId, name, year FROM student, class WHERE student.class=class.id",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.updateStudent = (req, res) => {
  const { firstName, middleName, lastName, gender } = req.body;
  const { id } = req.params;

  try {
    dbConnection.query(
      "UPDATE student SET firstName=?, middleName=?, lastName=?, gender=?, class=? WHERE id=?",
      [firstName, middleName, lastName, gender, req.body.class, id],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to edit Student" });
        if (results)
          res.status(200).send({ message: "Seccessfully edited a Student" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
