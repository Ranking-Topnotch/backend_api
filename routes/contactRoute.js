const express =require('express')
const router = express.Router()

const { getContact, getContactById, postContact, putContact, deleteContact } = require('../controller/contactController')
const validateToken = require('../middleware/validateToken')

router.use(validateToken) //protecting all the route below it
router.route('/').get(getContact)

router.route('/').post(postContact)

router.route('/:id').put(putContact)

router.route('/:id').get(getContactById)

router.route('/:id').delete(deleteContact)

module.exports = router