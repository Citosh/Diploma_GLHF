const Router = require('express')
const router = Router()
const controller = require('./user_controller')
const authMiddleware = require('../middleware/auth_middleware')
const roleMiddleware = require('../middleware/role_middleware')

router.put('/changepass', authMiddleware(), controller.change_pass )
router.put('/changeemail', authMiddleware(), controller.change_email)
router.put('/changedetails/:id', authMiddleware(), controller.changeUserInfo)

module.exports = router