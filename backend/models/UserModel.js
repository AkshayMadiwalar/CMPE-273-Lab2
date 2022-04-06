const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const UserSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    first_name :{
        type:String,
        trim:true,
        required:true
    },
    last_name :{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:64
    },
    gender: {
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    dob:{
        type:String
    },
    about:{
        type:String
    },
    profile_img: {
        type:String
    },
    country:{
        type:String
    },
    zip_code:{
        type:String
    },
    contact_number:{
        type:String
    },
    profile_img:{
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = User = mongoose.model('User',UserSchema)
