const ProductModel = require('./../models/ProductModel')
const CartModel = require('./../models/CartModel')
const uuid = require('uuid').v4

exports.addToCart = async (req, res) => {
    const { productId, userId, quantity, price } = req.body

    try {
        const product = await ProductModel.findOne({product_id:productId}).exec()
        if(product){
            const cart = await new CartModel({
                id:uuid(),
                seller_id:product.seller_id,
                product_id:productId,
                user_id:userId,
                product_name:product.name,
                img:product.img,
                category:product.category,
                description:product.description,
                price:product.price,
                quantity:product.quantity
            })
            await cart.save((err,data) => {
                if(err) return res.status(500).json({ message: 'Server error'+err })
                return res.json({message:"Added to cart"})
            })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server error'+error })
    }
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