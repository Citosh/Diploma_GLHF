const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator')
const User = require("../db/user_model")


class Auth_controller{

    async registration (req,res){
        const {name, password} = req.body
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message : "Registation error", errors})
            }
            const dbuser = await User.findAll({where: {name : name}})
            if(dbuser !== null){
                res.status(400).json(`user with ${name} login already exists`)
            }
            else{
                bcrypt.genSalt(7,  function(err, salt) {
                    bcrypt.hash(password, salt, async function(err, hash) {
                        const isAdded = await User.create({name: name, password: hash })
                        res.status(200).json("user added")
                    });
                });
            }
        } catch (error) {
            res.status(500).json(error)
        }

    }
    async login (req,res){
        const {name, password} = req.body
        try {
            const db = await User.findOne({ where: {name: name}})
            if(db === null){
                res.status(400).json(`user with ${name} username doesn't exists`)
            }
            bcrypt.compare(password, db.dataValues.password, function(err, result) {
                if(result)
                res.status(200).json("user logged in")
                else
                res.status(403).json("wrong password")
            });
        } catch (error) {
            
        }
    }

}

module.exports = new Auth_controller()


