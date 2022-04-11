const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const OrderSchema = new mongoose.Schema({
    order_id :{
        type:String,
        required:true,
        unique:true
    },
    product_id :{
        type:String,
        required:true
    },
    name:{
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
    },
    user_id:{
        type:String,
        required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },  
    user_email: {
        type:String
    },
    seller_id :{
        type:String,
        required:true
    },
    owner_id :{
        type:String,
        required:true
    },
    shop_name:{
        type:String
    },
    owner_name:{
        type:String
    },
    owner_email:{
        type:String
    },
    ph_number :{
        type:String
    },
    shop_img:{
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
    gift_wrap:{
        type: Boolean
    },
    gift_description:{
        type:String
    },
    product_img:{
        type:String
    }
}, 
    {timestamps:true}
);

module.exports = Order = mongoose.model('Order',OrderSchema)




