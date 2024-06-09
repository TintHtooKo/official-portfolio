const express = require('express')
const ContactController = require('../controller/ContactController')
const router = express.Router()
const {body} = require('express-validator')
const handleErrorMessage = require('../middleware/HandleErrorMessage')

router.get('/',ContactController.index)
router.post('/create',[
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('phone').notEmpty(),
    body('whatsapp').notEmpty(),
    body('message').notEmpty()
],handleErrorMessage,ContactController.create)
router.get('/detail/:id',ContactController.detail)
router.delete('/delete/:id',ContactController.delete)

module.exports = router