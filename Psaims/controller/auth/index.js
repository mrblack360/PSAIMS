var dbConnection = require("../../config/mysql");

exports.logout = (req, res) => {
  fs.writeFile(
    "src/app/shared/global-variable.ts",
    "export const user = {username: '', role: ''};",
    (err, result) => {
      if (err) console.log("Failed to log out");
    }
  );
  res.json({ message: "Logged Out Successfully" });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      dbConnection.query(
        "SELECT * FROM users WHERE username =? AND password =?",
        [username, password],
        (err, results, fields) => {
          if (err) res.send({ message: "error" });

          if (results.length <= 0) {
            res.redirect("/");
          } else {
            res.json({
              message:
                "Successfully logged in as " +
                results[0].username +
                " with " +
                results[0].role +
                " privelleges",
              result: results,
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    res.json({ message: "No field should be empty!" });
  }
};
