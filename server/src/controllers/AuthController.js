const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const config = require('../../config/constants')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await UserModel.findOne({email}).exec()

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).json({message:"Invalid Credentials"})
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
                return res.json({ "token" : "Bearer " + token })
            }
        )

    } catch (error) {
        return res.status(500).json({message:"Server error"+error})
    }
}

exports.getUserDetails = async (req,res) => {
    const id = req.user.id
    const user = await UserModel.findOne({id}).exec()
    if(user){
        return res.json(user)
    }
    return res.status(500).json({message:"No User found"})
}