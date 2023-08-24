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


}

module.exports = new Admin_controller()