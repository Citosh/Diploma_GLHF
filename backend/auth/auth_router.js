const Router = require("express")
const router = Router()
const {check} = require("express-validator")
const controller = require("./auth_controller")
const authMiddleware = require('../middleware/auth_middleware')




router.post('/reg',[
    check('email',"Please enter valid email").isEmail(),
    check('password', "Password must be smth between 8 and 16 characters").isLength({min: 8,max: 16})
], controller.registration)
router.post('/login', controller.login)
router.get('/check', authMiddleware(), controller.check)




module.exports = router