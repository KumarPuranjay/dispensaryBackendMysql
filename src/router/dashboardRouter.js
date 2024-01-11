const express = require('express')
const {getAllNumber} = require("../controllers/dashboardController");

const dashboardRouter = express.Router()
dashboardRouter.get('/getAll', getAllNumber);
module.exports = dashboardRouter;