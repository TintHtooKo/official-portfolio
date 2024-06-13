const express = require('express')
const MeController = require('../controller/meController')
const router = express.Router()
const {body} = require('express-validator')
const handleErrorMessage = require('../middleware/HandleErrorMessage')
const Upload = require('../helper/upload')

router.get('/',MeController.index)
router.post('/create',[
    body('name').notEmpty(),
],handleErrorMessage,MeController.create)
router.get('/detail/:id',MeController.detail)
router.patch('/update/:id',MeController.update)
router.delete('/delete/:id',MeController.delete)
router.post('/upload/:id',Upload.single('profile'),MeController.upload)

module.exports = router