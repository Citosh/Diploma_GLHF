const Router = require('express')
const router = Router()
const controller = require('./user_controller')
const authMiddleware = require('../middleware/auth_middleware')


router.put('/changepass', authMiddleware(), controller.changePass )
router.put('/changeemail', authMiddleware(), controller.changeEmail)
router.put('/changedetails', authMiddleware(), controller.changeUserInfo)
router.put('/setdata', authMiddleware(), controller.setUserData)
router.get('/getdata', authMiddleware(), controller.getUserData)
router.put('/filedata', authMiddleware(), controller.setFileData) 
router.patch('/filedata', authMiddleware(), controller.deleteFileByName)

router.post('/filedata', authMiddleware(), controller.getFileDataByName)
router.put('/filenames', authMiddleware(), controller.getFileNames)




module.exports = router