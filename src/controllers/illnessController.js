const {pool} = require("../db/config");
require('dotenv').config()

let getAllIllness = (req,res) => {
    pool.query(`SELECT id,illness_name FROM ${process.env.DB_TABLE_ILLNESS} WHERE delete_yn='n'`,
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
let addIllness = (req, res) => {
    let {illness_name, user_id} = req.body

    if(!illness_name || !user_id) {
        res.status(400).send('Enter correct illness_name and user_id')
    }
    console.log(illness_name)
    illness_name = illness_name.toLowerCase().trim()

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

    let sqlQuery = `INSERT INTO ${process.env.DB_TABLE_ILLNESS}(illness_name,updateuser,datetime,delete_yn) values('${illness_name}','${user_id}','${currentDateTime}','n')`

    pool.query(
        `SELECT * FROM ${process.env.DB_TABLE_ILLNESS} WHERE illness_name='${illness_name}'`,
        (err, results, fields) => {
            if(err) {
                console.log(err)
                res.status(400).send(err)
            }

            if(results.length > 0) {
                sqlQuery = `UPDATE ${process.env.DB_TABLE_ILLNESS} SET datetime='${currentDateTime}',delete_yn='n',updateuser='${user_id}' WHERE illness_name='${illness_name}'`
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

let removeIllness = (req, res) => {
    let {illness_id} = req.body
    if(!illness_id) {
        res.status(400).send('Please send the correct illness id')
    }

    pool.query(
        `UPDATE ${process.env.DB_TABLE_ILLNESS} set delete_yn='y' WHERE id='${illness_id}'`,
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

module.exports = {getAllIllness, addIllness, removeIllness}