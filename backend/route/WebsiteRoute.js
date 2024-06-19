const express = require('express')
const WebsiteController = require('../controller/WebsiteController')
const handleErrorMessage = require('../middleware/HandleErrorMessage')
const { body } = require('express-validator')
const router = express.Router()
const upload = require('../helper/upload')

router.get('/',WebsiteController.index)
router.post('/create',[
    body('name').notEmpty(),
    body('link').notEmpty()
],handleErrorMessage,WebsiteController.create)
router.get('/detail/:id',WebsiteController.detail)
router.patch('/update/:id',WebsiteController.update)
router.delete('/delete/:id',WebsiteController.delete)
router.post('/upload/:id',upload.single('image'),WebsiteController.upload)

module.exports = router