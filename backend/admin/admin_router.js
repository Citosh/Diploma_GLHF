const Router = require("express")
const router = Router()
const controller = require("./admin_controller")
const authMiddleware = require("../middleware/auth_middleware")
const roleMiddleware = require("../middleware/role_middleware")



router.get('/users', roleMiddleware(['USER','ADMIN']), controller.getAllUsers )
router.get('/user/:id', roleMiddleware(['USER','ADMIN']), controller.getUserById)
router.put('/setrole/:id', roleMiddleware(['USER']), controller.setRoleById )
router.put('/banuser/:id', roleMiddleware(['USER']), controller.banUserById)
router.put('/unbanuser/:id', roleMiddleware(['USER']), controller.unbanUserById)
router.get('/banlist', roleMiddleware(['USER']), controller.getBanList)

module.exports = router