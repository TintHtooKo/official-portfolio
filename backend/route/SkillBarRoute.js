const express = require('express')
const SkillBarController = require('../controller/SkillBarController')
const router = express.Router()
const {body} = require('express-validator')
const handleErrorMessage = require('../middleware/HandleErrorMessage')

router.get('/',SkillBarController.index)
router.post('/create',[
    body('name').notEmpty(),
    body('percent').notEmpty()
],handleErrorMessage,SkillBarController.create)
router.get('/detail/:id',SkillBarController.detail)
router.patch('/update/:id',SkillBarController.update)
router.delete('/delete/:id',SkillBarController.delete)

module.exports = router