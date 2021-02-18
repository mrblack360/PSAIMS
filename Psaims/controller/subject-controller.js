var dbConnection = require("../config/mysql");

//get a Class
exports.getOneSubject = (req, res) => {
  const { id } = req.params;
  try {
    dbConnection.query(
      "SELECT subject.id as subjectId, subject.name as subjectName, subjectTeacher, userName, firstName, middleName, lastName, subject.class, class.id as classId, class.name as className FROM class, subject LEFT JOIN teacher ON subjectTeacher=userName WHERE class=class.id AND id=?",
      [id],
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results.length === 0)
          res.status(404).send({ message: "Subject not found" });
        else res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// get all Classs
exports.getAllSubjects = (req, res) => {
  try {
    dbConnection.query(
      "SELECT subject.id as subjectId, subject.name as subjectName, subjectTeacher, userName, firstName, middleName, lastName, subject.class, class.id as classId, class.name as className FROM class, subject LEFT JOIN teacher ON subjectTeacher=userName WHERE class=class.id",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//add Class
exports.addSubject = (req, res) => {
  const { name, subjectTeacher, _class } = req.body;
  try {
    dbConnection.query(
      "INSERT INTO subject (name, subjectTeacher,  class) VALUES (?, ?, ?)",
      [name, subjectTeacher, _class],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to add Subject" });

        if (results)
          res.status(200).send({ message: "Seccessfully added a Subject" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//delete Class
exports.deleteSubject = (req, res) => {
  const { id } = req.params.id;
  try {
    dbConnection.query(
      "DELETE FROM subject WHERE id=?",
      [id],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to delete Subject" });
        if (results) res.status(200).send({ message: "Successfully Deleted" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.updateSubject = (req, res) => {
  const { name, subjectTeacher, _class } = req.body;
  const { id } = req.params;

  try {
    dbConnection.query(
      "UPDATE subject SET name=?, subjectTeacher=?, class=? WHERE id=" + id,
      [name, subjectTeacher, _class],
      (err, results, fields) => {
        if (err)
          res.status(417).send({ message: "Failed to edit Subject" + err });
        if (results)
          res.status(200).send({ message: "Seccessfully edited a Subject" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
