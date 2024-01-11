const {pool} = require("../db/config");
require('dotenv').config();

let getAllNumber= (req,res)=>{
    let result = [];

    pool.query(`SELECT id,illness_name FROM ${process.env.DB_TABLE_ILLNESS} WHERE delete_yn='n'`,
        (err1, results1, fields1)  => {
            if(err1) {
                console.log(err1)
                res.status(400).send(err1)
            }
            // console.log(results1)
            result.push(results1.length);
            pool.query(`SELECT id,symptom_name FROM ${process.env.DB_TABLE_SYMPTOMS} WHERE delete_yn='n'`,
                (err2, results2, fields2)  => {
                    if(err2) {
                        console.log(err2)
                    }
                    // console.log(results2.length)
                    result.push(results2.length);
                    pool.query(`SELECT id,advisory_name FROM ${process.env.DB_TABLE_ADVISORY} WHERE delete_yn='n'`,
                        (err3, results3, fields)  => {
                            if(err3) {
                                console.log(err3)
                            }
                            // console.log(results3)
                            result.push(results3.length);
                            res.status(200).send(result);
                        }
                    )
                }
            )
        }
    )
}


// Call the function to run the query
module.exports = {getAllNumber};

