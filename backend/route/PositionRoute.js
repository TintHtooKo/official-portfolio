const express = require('express')
const PositionController = require('../controller/PositionController')
const router = express.Router()
const {body} = require('express-validator')
const handleErrorMessage = require('../middleware/HandleErrorMessage')

router.get('/',PositionController.index)
router.post('/create',[
    body('position').notEmpty()
],handleErrorMessage,PositionController.create)
router.get('/detail/:id',PositionController.detail)
router.patch('/update/:id',PositionController.update)
router.delete('/delete/:id',PositionController.delete)

module.exports = router