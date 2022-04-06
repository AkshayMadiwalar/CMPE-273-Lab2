const uuid = require('uuid').v4
const ProductModel = require('./../models/ProductModel')
const CartModel = require('./../models/CartModel')

exports.addToCart = async (payload,cb) => {
    const { productId, userId, quantity, price } = payload

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
                if(err) return cb(err,null)
                return cb(null,data)
            })
        }

    } catch (error) {
        return cb(error,null)
    }
}