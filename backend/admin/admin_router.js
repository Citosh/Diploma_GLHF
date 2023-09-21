const Router = require("express")
const router = Router()
const controller = require("./admin_controller")
const authMiddleware = require("../middleware/auth_middleware")
const roleMiddleware = require("../middleware/role_middleware")



router.get('/users', roleMiddleware(['ADMIN']), controller.getAllUsers )

router.get('/user/:id', roleMiddleware(['USER','ADMIN']), controller.getUserById)
router.put('/setrole/:id', roleMiddleware(['ADMIN']), controller.setRoleById )
router.put('/banuser/:id', roleMiddleware(['ADMIN']), controller.banUserById)
router.put('/unbanuser/:id', roleMiddleware(['ADMIN']), controller.unbanUserById)
router.get('/banlist', roleMiddleware(['ADMIN']), controller.getBanList)
router.delete('/deleteuser/:id', roleMiddleware(['ADMIN']), controller.deleteUserById)

module.exports = router