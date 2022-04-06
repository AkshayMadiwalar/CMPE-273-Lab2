const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const SellerSchema = new mongoose.Schema({
    seller_id :{
        type:String,
        required:true
    },
    owner_id :{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    owner_name:{
        type:String
    },
    email: {
        type:String
    },
    ph_number :{
        type:String
    },
    currency:{
        type:String
    },
    city:{
        type:String
    },
    country: {
        type: String
    },
    img: {
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = Seller = mongoose.model('Seller',SellerSchema)




