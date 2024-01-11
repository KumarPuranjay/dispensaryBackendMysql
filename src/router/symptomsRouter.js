const express = require('express')
const {getAllSymptoms, addSymptoms, removeSymptoms} = require("../controllers/symptomsController");
const symptomsRouter = express.Router()

symptomsRouter.get('/getAll', getAllSymptoms)
symptomsRouter.post('/add', addSymptoms)
symptomsRouter.delete('/remove',removeSymptoms)

module.exports = symptomsRouter