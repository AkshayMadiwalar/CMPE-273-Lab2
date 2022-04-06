const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const CartSchema = new mongoose.Schema({
    id :{
        type:String,
        required:true
    },
    product_id :{
        type:String,
        required:true
    },
    user_id:{
        type:String
    },
    seller_id:{
        type:String
    },
    product_name: {
        type:String
    },
    img :{
        type:String
    },
    category:{
        type:String
    },
    description:{
        type:String
    },
    price: {
        type: String
    },
    quantity:{
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = Cart = mongoose.model('Cart',CartSchema)




