const express = require('express')
const {getAllAdvisory, addAdvisory, removeAdvisory} = require("../controllers/advisoryController");
const advisoryRouter = express.Router()

advisoryRouter.get('/getAll', getAllAdvisory)
advisoryRouter.post('/add', addAdvisory)
advisoryRouter.delete('/remove',removeAdvisory)

module.exports = advisoryRouter