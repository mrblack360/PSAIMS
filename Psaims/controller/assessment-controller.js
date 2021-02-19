var dbConnection = require("../config/mysql");
var moment = require("moment");

// get all Assessments
exports.getAllAssessments = (req, res) => {
  try {
    dbConnection.query(
      "SELECT assessment.id, assessment.name, subject, type, dateCreated, lastModified, assessmentType.id as typeId, assessmentType.name as typeName, subject.id as subjectId, subject.name as subjectName FROM assessment LEFT JOIN subject ON subject=subject.id LEFT JOIN assessmentType ON type=assessmentType.id",
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//add Assessment
exports.addAssessment = (req, res) => {
  const { name, subjectName, type } = req.body;
  try {
    dbConnection.query(
      "INSERT INTO assessment (name, subject, type,  lastModified) VALUES (?, ?,?, ?)",
      [name, subjectName, type, moment().toISOString()],
      (err, results, fields) => {
        if (err) res.status(417).send({ message: "Failed to add Assessment" });

        if (results)
          res.status(200).send({ message: "Seccessfully added a Assessment" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//delete Assessment
exports.deleteAssessment = (req, res) => {
  const { id } = req.params;
  try {
    dbConnection.query(
      "DELETE FROM assessment WHERE id=?",
      [id],
      (err, results, fields) => {
        if (err)
          res
            .status(417)
            .send({ message: "Failed to delete Assessment", body: err });
        if (results)
          res
            .status(200)
            .send({ message: "Successfully Deleted", body: results });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.updateAssessment = (req, res) => {
  const { name, subjectName, type } = req.body;
  const { id } = req.params;

  try {
    dbConnection.query(
      "UPDATE assessment SET name=?, subject=?, type=?, lastModified=? WHERE id=" +
        id,
      [name, subjectName, type, moment().toISOString()],
      (err, results, fields) => {
        if (err)
          res.status(417).send({ message: "Failed to edit Assessment" + err });
        if (results)
          res.status(200).send({ message: "Seccessfully edited a Assessment" });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
