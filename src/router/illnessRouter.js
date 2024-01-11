const express = require('express')
const {getAllIllness, addIllness, removeIllness} = require("../controllers/illnessController");
const illnessRouter = express.Router()

illnessRouter.get('/getAll', getAllIllness)
illnessRouter.post('/add', addIllness)
illnessRouter.delete('/remove',removeIllness)

module.exports = illnessRouter