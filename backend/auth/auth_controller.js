const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("../db/models/user_model")
const Token = require("../middleware/auth_middleware")
const { validationResult } = require('express-validator')

class Auth_controller{

    async registration (req,res){

        const {email, password} = req.body
        try {

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message : "registration error", errors})
            }

            const dbuser = await User.findAll({where: {email : email}})
            if(dbuser.length){
                res.status(401).json(`user with ${email} login already exists`)
            }
            else{
                bcrypt.genSalt(7,  function(err, salt) {
                    bcrypt.hash(password, salt, async function(err, hash) {
                        const isAdded = await User.create({email: email, password: hash })
                        res.status(200).json("user added")
                    });
                });
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async login (req,res){
        const {email, password} = req.body
        try {
            const db = await User.findOne({ where: {email: email}})

            if(db === null){
                res.status(400).json(`user with ${email} username doesn't exists`)
            }
            bcrypt.compare(password, db.dataValues.password, async function(err, result) {
                if(result){
                    console.log(typeof(process.env.JWT_SECRET))
                    const token = jwt.sign( {email: db.dataValues.email, role: db.dataValues.role},  process.env.JWT_SECRET);
                    await User.update({  access_token: token }, {
                        where: {
                          email: db.dataValues.email,
                        },
                      });
                    res.status(200).json({
                        message : "user logged in successfully",
                        token: token
                    })
                }
                else
                res.status(403).json("wrong password")
            });
        } catch (error) {
        }
    }

    async logout (req,res){
        const {email} = req.body;
        try {
            const db = await User.findOne({ where: {email: email}})
            if(db === null){
                res.status(400).json(`user with ${email} email doesn't exists`)
            }
            await User.update({  access_token: null }, {
                where: {
                    email: db.dataValues.email,
                },
              });
              res.status(200).json("logged out")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new Auth_controller()


