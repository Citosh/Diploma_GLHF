const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("../db/models/user_model")
const Token = require("../middleware/auth_middleware")
const { validationResult } = require('express-validator')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, role},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
}


class Auth_controller{

    async registration (req,res){

        const {email, password} = req.body
        try {

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(418).json({message : "registration error", errors})
            }

            const dbuser = await User.findAll({where: {email : email}})
            if(dbuser.length){
                res.status(406).json({message : `user with ${email} login already exists`})
            }
            else{
                bcrypt.genSalt(7,  function(err, salt) {
                    bcrypt.hash(password, salt, async function(err, hash) {
                        const isAdded = await User.create({email: email, password: hash })
                        res.status(200).json({message: "user added"})
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

                res.status(400).json({message: `user with ${email} email doesn't exists`})

            }
            bcrypt.compare(password, db.dataValues.password, async function(err, result) {
                if(result){
                    console.log(typeof(process.env.JWT_SECRET))
                    const token = generateJwt(db.dataValues.id, db.dataValues.role)
                    await User.update({  access_token: token }, {
                        where: {
                          id: db.dataValues.id,
                        },
                      });
                    res.status(200).json({
                        message : "user logged in successfully",
                        token: token
                    })
                }
                else
                res.status(403).json({message: "wrong password"})
            });
        } catch (error) {
        }
    }

    async logout (req,res){
        const {email} = req.body;
        try {
            const db = await User.findOne({ where: {email: email}})
            if(db === null){
                res.status(400).json({message: `user with ${email} email doesn't exists`})
            }
            await User.update({  access_token: null }, {
                where: {
                    email: db.dataValues.email,
                },
              });
              res.status(200).json({message: "logged out"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.role)
        return res.json({token})
    }
}

module.exports = new Auth_controller()


