const ProductModel = require('./../models/ProductModel')
const CartModel = require('./../models/CartModel')
const uuid = require('uuid').v4
const kafka = require('./../../kafka/kafka')
const actions = require('./../../actions/actions.json')

exports.addToCart = async (req,res) => {
    const { productId, userId, quantity, price } = req.body
    kafka.sendKafkaRequest('etsy',{ productId, userId, quantity, price, action:actions.ADD_TO_CART },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}


exports.getCartItems = async (req, res) => {
    const { userId } = req.body
    try {
        const items = await CartModel.find({user_id:userId}).exec()

        if(items){
            return res.json(items)
        }
        return res.json([])
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.removeCartItem = async (req, res) => {
    const { userId, productId } = req.body
    try {
        const data = await CartModel.deleteOne({user_id:userId,product_id:productId})
        if(data){
            return res.json(data)
        }
        return res.status(500).json({ message: "Server Error" })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}