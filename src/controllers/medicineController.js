const {pool} = require("../db/config");
require("dotenv").config();

const getAllMedicines = (req, res) => {
  try {
    pool.query(
      `SELECT * FROM ${process.env.MEDICINE_MASTER_NAME} WHERE del_yn='n'`,
      (err, results, fields) => {
        if (err) {
          console.log(
            "if she owes your hoody, then she shall get your woody!!"
          );
          console.log(err);
          res.status(400).send("Error Occured");
        }
        console.log(results);
        res.status(200).send(results);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const getMedicine = (req, res) => {
  try {
    let id = req.body.id;

    pool.query(
      `SELECT * FROM ${process.env.MEDICINE_MASTER_NAME} WHERE id = ${id} AND del_yn = 'n'`,
      (err, results, fields) => {
        if (err) {
          console.log(
            "if she owes your hoody, then she shall get your woody!!"
          );
          console.log(err);
          res.status(400).send("Error Occured");
        }
        if (results.length !== 0) {
          console.log(results);
          res.status(200).send(results);
        } else {
          res.status(404).send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const addMedicine = (req, res) => {
  try {
    let { branch ,med_name, med_available, del_yn, updateuser,type,base_count} = req.body;
    if (!med_name || !med_available || !del_yn || !updateuser||!branch||!type||!base_count) {
      res.status(400).send("Error");
    }
    console.log(med_name);
    med_name = med_name.toLowerCase().trim();
    let currentDateTime = new Date();

    // Specify 'en-IN' for Indian English locale
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    };

    currentDateTime = new Date(currentDateTime.toLocaleString("en-IN", options))
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    let sqlQuery = `INSERT INTO ${process.env.MEDICINE_MASTER_NAME} (med_name, med_available, del_yn,date_lu,updateuser,branch,type,base_count) VALUES ('${med_name}', ${med_available}, '${del_yn}','${currentDateTime}',${updateuser},'${branch}','${type}',${base_count})`;
    pool.query(
      `SELECT * FROM ${process.env.MEDICINE_MASTER_NAME} WHERE med_name='${med_name}'`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }

        if (results.length > 0) {
          sqlQuery = `UPDATE ${process.env.MEDICINE_MASTER_NAME} SET med_available=med_available+${med_available},date_lu='${currentDateTime}',del_yn='n',updateuser='${updateuser}' WHERE med_name='${med_name}'`;
        }

        pool.query(sqlQuery, (err, results, fields) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          console.log(results);
          res.status(200).send(results);
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const changeMedicineQuantity = (req, res) => {
  try {
    // console.log("123");
    let quantity = req.body.quantity;
    let id = req.body.id;
    let operation = req.body.operation;
    let updateuser = req.body.updateuser
    if (!quantity || !id || !updateuser) {
      return res.status(400).send("Enter valid quantity");
    }
    pool.query(

      `UPDATE ${
        process.env.MEDICINE_MASTER_NAME
      } ${operation==='' ? `SET med_available=${quantity}`:`SET med_available=med_available ${operation}${quantity},updateuser=${updateuser}`} WHERE id=${id} ${
        operation === "-" ? `AND med_available>=${quantity}` : ``
      } AND del_yn='n'`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send("Error Occured");
        }
        if (results.length !== 0) {
          console.log(results);
          return res.status(200).send(results);
        } else {
          return res.status(404).send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const removeMedicine = async (req, res) => {
  try {
    let id = req.body.id;

    if (!id) {
      res.status(400).send("Enter valid quantity");
    }
    pool.query(
      `UPDATE ${process.env.MEDICINE_MASTER_NAME} SET del_yn='y' WHERE id=${id}`,
      (err, results, fields) => {
        if (err) {
          console.log(
            "if she owes your hoody, then she shall get your woody!!"
          );
          console.log(err);
          res.status(400).send("Error Occured");
        }
        if (results.length !== 0) {
          console.log(results);
          res.status(200).send(results);
        } else {
          res.status(404).send(results);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getAllMedicines,
  addMedicine,
  getMedicine,
  changeMedicineQuantity,
  removeMedicine,
};
