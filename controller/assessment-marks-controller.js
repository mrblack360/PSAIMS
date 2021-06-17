var dbConnection = require("../config/mysql");
var moment = require("moment");

// get Assessments Form
exports.getAssessmentMarks = (req, res) => {
  let { id } = req.params;
  try {
    dbConnection.query(
      "SELECT id, firstName, middleName, lastName, marks FROM student LEFT JOIN assessmentMarks ON id=student AND assessment=? WHERE class=(SELECT class FROM subject WHERE id=(SELECT subject FROM assessment WHERE id=?)) ORDER BY firstName",
      [id, id],
      (err, results, fields) => {
        if (err) res.status(502).send({ message: "Service Unavailable" });
        if (results) res.json(results);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.updateAssessmentMarks = (req, res) => {
  const { student, assessment, marks } = req.body;
  try {
    dbConnection.query(
      "UPDATE assessmentMarks SET marks=?, lastModified=? WHERE student=? AND assessment=?",
      [marks, moment().toISOString(), student, assessment],
      (err, results, fields) => {
        if (err)
          res
            .status(417)
            .send({ message: "Failed to edit Assessment Marks" + err });
        if (results) {
          if (results.affectedRows === 1) {
            res
              .status(200)
              .send({ message: "Seccessfully updated Assessment marks" });
          }
          if (results.affectedRows === 0) {
            try {
              dbConnection.query(
                "INSERT INTO assessmentMarks(student, assessment, marks, lastModified) VALUES(?,?,?,?)",
                [student, assessment, marks, moment().toISOString()],
                (err, results, fields) => {
                  if (err)
                    res.status(502).send({ message: "Service Unavailable" });
                  if (results)
                    res.json({
                      message: "Successfully updated Assessment marks",
                    });
                }
              );
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
