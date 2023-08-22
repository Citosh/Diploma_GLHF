const Router = require("express")
const router = Router()
const controller = require("./auth_controller")
const {check} = require("express-validator")



router.post('/reg', controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.logout)




module.exports = router