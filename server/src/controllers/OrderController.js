const OrderModel = require('./../models/OrderModel')
const CartModel = require('./../models/CartModel')
const ProductModel = require('./../models/ProductModel')
const SellerModel = require('./../models/SellerModel')
const UserModel = require('../models/UserModel')
const uuid = require('uuid').v4

exports.placeOrder = async (req,res) => {
    const {elasticId,productId,userId,price,quantity} = req.body
    try {
        const d = Date(Date.now)
        const date = d.toString().split(' ')[0] + ' '+ d.toString().split(' ')[1]+ ' ' + d.toString().split(' ')[2] + ' '+ d.toString().split(' ')[3]

        const product = await ProductModel.findOne({product_id:productId}).exec()
        const user = await UserModel.findOne({id:userId}).exec()
        if(product && user){
            const order = new OrderModel({
                order_id:uuid(),
                product_id:productId,
                seller_id:product.seller_id,
                name:product.name,
                category:product.category,
                description:product.description,
                price:product.price,
                quantity:product.quantity,
                user_id:userId,
                first_name:user.first_name,
                last_name:user.last_name,
                user_email: user.email 
                
            })
        }
        OrderModel.placeOrder({productId,userId,price,quantity,date},(err,data)=>{
            if(err) return res.status(500).json({message:"Server error"+err})
            if(data){
                const orderModel = data
                CartModel.deleteByUserId({userId},(err,data)=>{
                    if(err) return res.status(201).json({message:'Order placed, failed to remove items from cart'})
                    if(data){
                        ProductModel.incrementSales({elasticId,productId,quantity},(err,data)=>{
                            if(err){
                                console.log(err)
                                return res.status(201).json({message:'Order placed, failed to update product sales'})
                            }
                            else{
                                SellerModel.incrementSales({sellerId:orderModel.sellerId,quantity},(err,data)=>{
                                    if(err){
                                        return res.status(201).json({message:'Order placed, failed to update seller sales'})
                                    }
                                    else{
                                        //--SUCCESSFULL ORDER--
                                        console.log("---success order---")
                                        return res.json(data)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        return res.status(500).json({message:"Server error"+error})
    }
}

exports.myOrders = (req,res) => {
    const {id} = req.body
    OrderModel.myOrders({id},(err,data)=>{
        if(err) return res.status(500).json({message:'Server Error'})
        return res.json(data)
    })
}
