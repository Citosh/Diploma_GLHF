const jwt = require("jsonwebtoken")
const User = require("../db/models/user_model")
const Info = require("../db/models/info_model")
const Data = require("../db/models/data_model")

class Admin_controller {

    async getAllUsers(req,res){
        try {
            const users = await User.findAll({attributes: ['id', 'email', 'role', 'isbanned']})
            res.json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getUserById(req,res){
        try {
            const {id} = req.params;
            const user = await User.findOne({
                where: {id : id},
                attributes: ['id', 'email', 'role'],
                include: Info,
            })
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

            if(role === user.dataValues.role){
                res.status(400).json({message: `user with id: ${id} already has role ${role}`})
            }

            await User.update({  role: role }, {
                where: {
                  id: user.dataValues.id,
                },
              });
              res.status(200).json({ message: `role changed to ${role} for user with ${id} id`} )

        } catch (error) {
            res.status(500).json(error)
        }
    }

    async banUserById (req,res){
        const id = req.params.id

        try {
            const user = await User.findOne({where: {id: id}})
            if(!user){
                res.status(400).json({message: "User not found"})
            }
            else if(user.dataValues.isbanned === true){
                res.status(400).json({message: "User already banned"})
            }
            else{
                await User.update({isbanned: true},{
                    where: {
                        id: id
                    }
                })
                res.status(200).json({message: "User banned successfully"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async unbanUserById (req,res){
        const id = req.params.id

        try {
            const user = await User.findOne({where: {id: id}})
            if(!user){
                res.status(400).json({message: "User not found"})
            }
            else if(user.dataValues.isbanned === false){
                res.status(400).json({message: "User already unbanned"})
            }
            else{
                await User.update({isbanned: false},{
                    where: {
                        id: id
                    }
                })
                res.status(200).json({message: "User unbanned successfully"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getBanList (req,res){
        try {
            const bannedUsers = await User.findAll({
                where: {
                    isbanned : true
                },
                attributes: ['id', 'email', 'role']
            })
            if(bannedUsers.length === 0){
                res.status(200).json({message: "No banned users"})
            }
            else{
                res.status(200).json(bannedUsers)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteUserById(req,res){
        const id = req.params.id
        try {
            const user = await User.destroy({
                where: {
                    id: id
                }
            })
            if(!user){
                res.status(400).json({message: "User not found"})
            }
            else{
                await Info.destroy({where: {id: id}})
                res.status(200).json({message: "User deleted successfully"})
            }
        } catch (error) {
            res.status(500).json(error)
        }
       
    }

}

module.exports = new Admin_controller()