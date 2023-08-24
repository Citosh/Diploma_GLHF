const jwt = require('jsonwebtoken')

module.exports = function (){
    return function (req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                res.status(403).json({message : "user must be authorized"})
            }
            const decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedData
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({message : "0_0"})
        }
    }


}