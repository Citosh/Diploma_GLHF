const Router = require("express")
const router = Router()
const controller = require("./auth_controller")
const {check} = require("express-validator")



router.post('/reg', [
    check('name', 'empty name is not allowed!').notEmpty(),
    check('password', 'password must be between 8 and 16 symbols!').isLength({min: 8, max: 16})
], controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.logout)




module.exports = router