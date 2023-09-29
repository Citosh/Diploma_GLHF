const Router = require('express')
const router = Router()
const controller = require('./user_controller')
const authMiddleware = require('../middleware/auth_middleware')


router.put('/changepass', authMiddleware(), controller.changePass ) //tested 
router.put('/changeemail', authMiddleware(), controller.changeEmail) //tested
router.put('/changedetails', authMiddleware(), controller.changeUserInfo) //tested

router.put('/filedata', authMiddleware(), controller.setFileData)  
router.patch('/filedata', authMiddleware(), controller.deleteFileByName)

router.post('/filedata', authMiddleware(), controller.getFileDataByName)
router.put('/filenames', authMiddleware(), controller.getFileNames)




module.exports = router