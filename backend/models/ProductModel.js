const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const ProductSchema = new mongoose.Schema({
    product_id :{
        type:String,
        required:true
    },
    seller_id :{
        type:String
    },
    name:{
        type:String
    },
    img:{
        type:String
    },
    category: {
        type:String
    },
    description :{
        type:String
    },
    price:{
        type:String
    },
    quantity:{
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = Product = mongoose.model('Product',ProductSchema)

