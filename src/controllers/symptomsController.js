const {pool} = require("../db/config");
require('dotenv').config()

let getAllSymptoms = (req,res) => {
    pool.query(`SELECT id,symptom_name FROM ${process.env.DB_TABLE_SYMPTOMS} WHERE delete_yn='n'`,
        (err, results, fields)  => {
            if(err) {
                console.log(err)
                res.status(400).send(err)
            }
            console.log(results.length)
            res.status(200).send(results)
        }
    )
}
let addSymptoms = (req, res) => {
    let {symptom_name, user_id} = req.body

    if(!symptom_name || !user_id) {
        res.status(400).send('Enter correct symptom_name and user_id')
    }

    symptom_name = symptom_name.toLowerCase().trim()

    let currentDateTime = new Date();
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

    let sqlQuery = `INSERT INTO ${process.env.DB_TABLE_SYMPTOMS}(symptom_name,updateuser,datetime,delete_yn) values('${symptom_name}','${user_id}','${currentDateTime}','n')`

    pool.query(
        `SELECT * FROM ${process.env.DB_TABLE_SYMPTOMS} WHERE symptom_name='${symptom_name}'`,
        (err, results, fields) => {
            if(err) {
                console.log(err)
                res.status(400).send(err)
            }

            if(results.length > 0) {
                sqlQuery = `UPDATE ${process.env.DB_TABLE_SYMPTOMS} SET datetime='${currentDateTime}',delete_yn='n',updateuser='${user_id}' WHERE symptom_name='${symptom_name}'`
            }

            pool.query(
                sqlQuery,
                (err, results, fields)  => {
                    if(err) {
                        console.log(err)
                        res.status(400).send(err)
                    }
                    console.log(results)
                    res.status(200).send(results)
                }
            )
        }
    )
}

let removeSymptoms = (req, res) => {
    let {symptom_id} = req.body

    if(!symptom_id) {
        res.status(400).send('Please send the correct symptom id')
    }

    pool.query(
        `UPDATE ${process.env.DB_TABLE_SYMPTOMS} set delete_yn='y' WHERE id='${symptom_id}'`,
        (err, results, fields)  => {
            if(err) {
                console.log(err)
                res.status(400).send(err)
            }
            console.log(results)
            res.status(200).send(results)
        }
    )
}

module.exports = {getAllSymptoms, addSymptoms, removeSymptoms}