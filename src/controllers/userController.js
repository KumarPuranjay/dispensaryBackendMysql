const { validateLdapUser } = require("../utils/ldapLogin");
const { pool } = require("../db/config");
require("dotenv").config();

function userSignIn(req, res) {
  let userName = req.body.userName;
  let password = req.body.password;

  if (!userName || !password) {
    res.status(400).send("Enter correct username and password.");
  }

  validateLdapUser(userName, password)
    .then((result) => {
      if (result) {
        console.log("LDAP authentication successful");
        pool.query(
          `SELECT * FROM ${process.env.DB_TABLE_USER} WHERE id_number='${userName}'`,
          (err, results, fields) => {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            console.log(results);
            res.status(200).send(results);
          }
        );
      } else {
        console.log("LDAP authentication failed");
        res.status(404).send("Enter the correct details");
      }
    })
    .catch((error) => {
      console.error("LDAP authentication error:", error);
      res.status(400).send(error);
    });
}

function getAllUsers(req, res) {
  pool.query(
    `SELECT * FROM ${process.env.DB_TABLE_USER}`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      console.log(results);
      res.status(200).send(results);
    }
  );
}

function addUser(req, res) {
  let { id_number, name, linked_id, dob } = req.body;

  if (!linked_id) linked_id = 0;

  if (!id_number || !name || !dob) {
    res.status(400).send("Enter the correct data");
  }

  pool.query(
    `INSERT INTO ${process.env.DB_TABLE_USER}(id_number, name,linked_id,dob) VALUES('${id_number}','${name}','${linked_id}', CAST(N'${dob}' AS Date))`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(results);
    }
  );
}

function getUser(req, res) {
  let userName = req.body.userName;

  if (!userName) {
    res.status(400).send("Enter correct username.");
  }

  pool.query(
    `SELECT * FROM ${process.env.DB_TABLE_USER} WHERE id_number='${userName}'`,
    (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      console.log(results);
      res.status(200).send(results);
    }
  );
}

module.exports = { userSignIn, getAllUsers, getUser, addUser };
