const express = require('express')
const RoleController = require('../controller/RoleController')
const router = express.Router()

router.get('/',RoleController.index)
router.post('/create',RoleController.create)
router.delete('/delete/:id',RoleController.delete)

module.exports = router