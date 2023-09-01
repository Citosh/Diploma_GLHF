const Router = require('express')
const router = Router()
const controller = require('./data_gen_controller')
const roleMiddleware = require('../middleware/role_middleware')


const Data_Gen_Controller = require('./data_gen_controller')


router.get('/rangen', roleMiddleware(['USER','ADMIN']), controller.gen_ran_data )


module.exports = router