const {pool} = require("../db/config");
require("dotenv").config();

const addVisit = (req, res) => {
    try {
        let patient_id  = req.body.patient_id;
        let updateuser  = req.body.updateuser;
        if (!patient_id) {
            res.status(400).send("Error");
        }
        patient_id = patient_id.toLowerCase().trim();
        let currentDateTime = new Date();
        let currentDate = getCurrentDate();

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

        let sqlQuery = `INSERT INTO ${process.env.TRANS_VISIT_NAME} (patient_id, date, updateDateTime,updateuser) VALUES ('${patient_id}', '${currentDate}','${currentDateTime}',${updateuser})`;
        pool.query(
            sqlQuery,
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).send(results);
            }
        );
    } catch (error) {
        console.error(error);
    }
}

const getCurrentDate= () =>{
    const currentDate = new Date();

// Get the full year (4 digits)
    const year = currentDate.getFullYear();

// Get the month (0-11, where 0 is January and 11 is December)
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

// Get the day of the month
    const day = currentDate.getDate().toString().padStart(2, '0');

// Print the formatted date
    return `${year}-${month}-${day}`;
}

module.exports = {addVisit};