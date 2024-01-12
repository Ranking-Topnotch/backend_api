const express = require('express')
const validateToken = require('../middleware/validateToken')

const { registerUser, loginUser, currentUser } = require('../controller/usersController')

const router = express.Router()

router.route('/registerUser').post(registerUser)

router.route('/loginUser').post(loginUser)

//router.get('/currentUser', validateToken, currentUser)
router.route('/currentUser').get(validateToken, currentUser)

module.exports = router