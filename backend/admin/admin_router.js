const Router = require("express")
const router = Router()
const controller = require("./admin_controller")
const authMiddleware = require("../middleware/auth_middleware")
const roleMiddleware = require("../middleware/role_middleware")



router.get('/users', roleMiddleware(['ADMIN']), controller.getAllUsers )
<<<<<<< HEAD
router.get('/user/:id', roleMiddleware(['USER','ADMIN']), controller.getUserById)
=======
router.get('/user/:id', roleMiddleware(['ADMIN']), controller.getUserById)
>>>>>>> 3eeda147c91c5de5afc85d5bdd183ddae536d272
router.put('/setrole/:id', roleMiddleware(['ADMIN']), controller.setRoleById )
router.put('/banuser/:id', roleMiddleware(['ADMIN']), controller.banUserById)
router.put('/unbanuser/:id', roleMiddleware(['ADMIN']), controller.unbanUserById)
router.get('/banlist', roleMiddleware(['ADMIN']), controller.getBanList)
router.delete('/deleteuser/:id', roleMiddleware(['ADMIN']), controller.deleteUserById)
<<<<<<< HEAD
=======

>>>>>>> 3eeda147c91c5de5afc85d5bdd183ddae536d272

module.exports = router