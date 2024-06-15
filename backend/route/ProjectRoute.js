const express = require('express')
const ProjectController = require('../controller/ProjectController')
const handleErrorMessage = require('../middleware/HandleErrorMessage')
const router = express.Router()
const {body} = require('express-validator')
const Upload = require('../helper/upload')

router.get('/',ProjectController.index)
router.post('/create',[
    body('name').notEmpty(),
    body('link').notEmpty()
],handleErrorMessage,ProjectController.create)
router.get('/detail/:id',ProjectController.detail)
router.patch('/update/:id',ProjectController.update)
router.delete('/delete/:id',ProjectController.delete)
router.post('/upload/:id',Upload.single('image'),ProjectController.upload)

module.exports = router