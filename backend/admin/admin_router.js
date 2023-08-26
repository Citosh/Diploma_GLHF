const Router = require("express")
const router = Router()
const controller = require("./admin_controller")
const authMiddleware = require("../middleware/auth_middleware")
const roleMiddleware = require("../middleware/role_middleware")



router.get('/users', roleMiddleware(['USER']), controller.getAllUsers )
router.get('/user/:id', roleMiddleware(['USER']), controller.getUserById)
router.put('/setrole/:id', roleMiddleware(['USER']), controller.setRoleById )

module.exports = router