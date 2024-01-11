const express = require('express');
const {
    addVisit
} = require("../controllers/visitController");
const visitRouter = express.Router();
visitRouter.post('/add',addVisit);
module.exports = {visitRouter};