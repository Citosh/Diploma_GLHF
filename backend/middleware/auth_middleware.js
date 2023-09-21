const jwt = require('jsonwebtoken')

module.exports = function (){
    return function (req, res, next){
        try {
            console.log(req.headers.authorization)
            if(!req.headers.authorization) {
                res.status(401).json({message : "User must be authorized"})
            }
            else{
                const token = req.headers.authorization.split(' ')[1]

                const decodedData = jwt.verify(token, process.env.JWT_SECRET)
                req.user = decodedData
                next()
            }
        } catch (error) {
            console.log(error)
            res.status(401).json({message : "user must be authorized"})
        }
    }


}