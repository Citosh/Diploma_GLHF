const jwt = require('jsonwebtoken')


 
module.exports = function (permitedRoles) {
    return function (req, res, next) {

        if(req.method === "OPTIONS") {
            next()
        } 
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                res.status(403).json({message : "user is not authorized"})
            }

            const {role} =  jwt.verify(token, process.env.JWT_SECRET)
            let hasRole = false
            
            if(permitedRoles.includes(role)){
                hasRole = true
            }
            if(!hasRole) {
                return res.status(403).json({message : "Permission denied"})    
            }
            next()
            
        } catch (error) {
            console.log(error)
            res.status(403).json({message : "user must be authorized"})
        }
    }
}