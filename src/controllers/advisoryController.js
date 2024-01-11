const {pool} = require("../db/config");
require('dotenv').config()

function getAllAdvisory(req, res) {
    pool.query(`SELECT id,advisory_name FROM ${process.env.DB_TABLE_ADVISORY} WHERE delete_yn='n'`,
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

function addAdvisory(req, res) {
    let {advisory_name, user_id} = req.body

    if(!advisory_name || !user_id) {
        res.status(400).send('Enter correct advisory_name and user_id')
    }

    advisory_name = advisory_name.toLowerCase().trim()

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

    let sqlQuery = `INSERT INTO ${process.env.DB_TABLE_ADVISORY}(advisory_name,updateuser,datetime,delete_yn) values('${advisory_name}','${user_id}','${currentDateTime}','n')`

    pool.query(
        `SELECT * FROM ${process.env.DB_TABLE_ADVISORY} WHERE advisory_name='${advisory_name}'`,
        (err, results, fields) => {
            if(err) {
                console.log(err)
                res.status(400).send(err)
            }

            if(results.length > 0) {
                sqlQuery = `UPDATE ${process.env.DB_TABLE_ADVISORY} SET datetime='${currentDateTime}',delete_yn='n',updateuser='${user_id}' WHERE advisory_name='${advisory_name}'`
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

function removeAdvisory(req, res) {
    let {advisory_id} = req.body

    if(!advisory_id) {
        res.status(400).send('Please send the correct advisory id')
    }

    pool.query(
        `UPDATE ${process.env.DB_TABLE_ADVISORY} set delete_yn='y' WHERE id='${advisory_id}'`,
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

module.exports = {addAdvisory, getAllAdvisory, removeAdvisory}