const jwt = require('jsonwebtoken')
const config = require('./../config/constants.json')

module.exports = (req,res,next) => {

    //Get token from the headers
    const token = req.header('access-token')

    if(!token){
        return res.status(401).json({message:'Unauthorised access'})
    }

    //Verify token
    try {
        const decoded = jwt.verify(token,config.jwtSecret)
        req.user = decoded.user
        next()
    } catch (error) {
        return res.status(401).json({message:'Unauthorised access'})
    }
}
