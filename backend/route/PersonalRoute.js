const express = require('express')
const PersonalController = require('../controller/PersonalController')
const router = express.Router()
const upload = require('../helper/upload')
const handleErrorMessage = require('../middleware/HandleErrorMessage')
const { body } = require('express-validator')

router.get('/',PersonalController.index)
router.post('/create',[
    body('email').notEmpty(),
    body('phone').notEmpty(),
    body('whatsapp').notEmpty()
],handleErrorMessage,PersonalController.create)
router.get('/detail/:id',PersonalController.detail)
router.patch('/update/:id',PersonalController.update)
router.delete('/delete/:id',PersonalController.delete)
router.post('/upload/:id',upload.single('cv'),PersonalController.upload)

module.exports = router