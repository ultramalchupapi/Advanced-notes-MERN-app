const express = require('express')
const { signup, login } = require('../controllers/user.controller')

const authRoute = express.Router()

authRoute.post('/signup', signup)

authRoute.post('/login',login)

module.exports = authRoute