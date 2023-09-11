const Router = require('express')
const router = Router()
const controller = require('./user_controller')
const authMiddleware = require('../middleware/auth_middleware')
const roleMiddleware = require('../middleware/role_middleware')

router.put('/changepass', authMiddleware(), controller.changePass )
router.put('/changeemail', authMiddleware(), controller.changeEmail)
router.put('/changedetails/:id', authMiddleware(), controller.changeUserInfo)

module.exports = router