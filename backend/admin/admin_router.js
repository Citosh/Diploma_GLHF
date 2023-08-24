const Router = require("express")
const router = Router()
const controller = require("./admin_controller")
const authMiddleware = require("../middleware/auth_middleware")
const roleMiddleware = require("../middleware/role_middleware")



router.get('/users', roleMiddleware(['USER']), controller.getAllUsers )


module.exports = router