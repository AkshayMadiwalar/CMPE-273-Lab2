const UserModel = require('./../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.login = async (payload,cb) => {
    const { email, password } = payload
    try {

        const user = await UserModel.findOne({email}).exec()

        if(!user){
            return cb("User Not found",null)
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return cb("Invalid credentials",null)
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err
                return cb(null,{ "token" : "Bearer " + token })
            }
        )

    } catch (error) {
        return cb(error,null)
    }
}

exports.getUserDetails = async (payload,cb) => {
    const {id} = payload
    const user = await UserModel.findOne({id}).exec()
    if(user){
        return cb(null,user)
    }
    return cb("No User found",null)
}