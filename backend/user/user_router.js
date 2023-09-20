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
router.get('/filenames', authMiddleware(), controller.getFileNames)
router.get('/filedata', authMiddleware(), controller.getFileDataByName)


/* route put/filedata recieved : 
{ "fileObj": {
    "name" : "qasdfvd",
    "quantity": "1",
    "date": "00.00.0000"
    },
    "fileName": "user_004"
} */
/* route get/filedata recieved : 
{ 
    "fileName": "user_004"
} */
module.exports = router