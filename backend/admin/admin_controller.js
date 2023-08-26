const jwt = require("jsonwebtoken")
const User = require("../db/models/user_model")

class Admin_controller {
    async getAllUsers(req,res){
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getUserById(req,res){
        try {
            const {id} = req.params;

            const user = await User.findOne({where: {id : id} })
            if(!user){
                res.status(400).json({message: `User with id ${id} not found` })
            }
            res.status(200).json(user)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async setRoleById(req,res){
        try {
            let {role} = req.body;
            role = role.toUpperCase()
            const {id} = req.params;

            const validRoles = ['USER','ADMIN']
            const user = await User.findOne({where: {id : id} })

            if(!user){
                res.status(400).json({message: `User with id ${id} not found` })
            }

            if(!validRoles.includes(role)){
                res.status(400).json({message: `please enter valid roles (${validRoles})`})
            }

            await User.update({  role: role }, {
                where: {
                  id: user.dataValues.id,
                },
              });
              res.status(200).json(`role changed to ${role} for user with ${id} id` )

        } catch (error) {
            
        }
    }


}

module.exports = new Admin_controller()