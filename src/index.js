const express = require('express')
const {pool} = require("./db/config");
const userRouter = require("./router/userRouter");
const app = express()
const cors = require('cors');
const advisoryRouter = require("./router/advisoryRouter");
const dashboardRouter = require("./router/dashboardRouter");
const illnessRouter = require("./router/illnessRouter");
const symptomsRouter = require("./router/symptomsRouter");
const medicineRouter = require("./router/medicineRouter");
const {visitRouter} = require("./router/visitRouter");

const corsOptions = {
    "origin": "*",
    "methods": ["GET", "POST", "DELETE", "PUT"]
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user", userRouter)
app.use("/advisory", advisoryRouter)
app.use("/illness", illnessRouter)
app.use("/symptoms", symptomsRouter)
app.use("/dashboard",dashboardRouter)
app.use("/medicine", medicineRouter);
app.use("/visit",visitRouter);

const PORT = process.env.PORT || 8080

app.get('/',(req, res) => {
    res.send('Hello to this Api')
})

app.listen(PORT, () => {
    console.log(`Listening the port ${PORT}...`)
    // pool.
    pool.getConnection(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database');
    })
})
