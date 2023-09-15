const Router = require('express')
const router = Router()
const controller = require('./user_controller')
const authMiddleware = require('../middleware/auth_middleware')


router.put('/changepass', authMiddleware(), controller.changePass )
router.put('/changeemail', authMiddleware(), controller.changeEmail)
router.put('/changedetails/:id', authMiddleware(), controller.changeUserInfo)
router.put('/setdata/:id', authMiddleware(), controller.setUserData)
router.get('/getdata', authMiddleware(), controller.getUserData)


module.exports = router