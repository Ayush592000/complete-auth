const { signUp, logIn } = require('../controller/authController')
const { signUpValidation, logInValidation } = require('../middleware/AuthValidation')

const router = require('express').Router()

router.post('/login', logInValidation, logIn)

router.post('/signup', signUpValidation, signUp)

module.exports = router