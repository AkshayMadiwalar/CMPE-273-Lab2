const OrderModel = require('./../models/OrderModel')
const UserModel  = require('./../models/UserModel')
const SellerModel = require('./../models/SellerModel')
const CartModel = require('./../models/CartModel')
const ProductModel  = require('./../models/ProductModel')
const uuid = require('uuid').v4

exports.placeOrder = async (payload,cb) => {
    const {elasticId,productId,userId,price,quantity,giftWrap,giftDescription} = payload
    try {
        const d = Date(Date.now)
        const date = d.toString().split(' ')[0] + ' '+ d.toString().split(' ')[1]+ ' ' + d.toString().split(' ')[2] + ' '+ d.toString().split(' ')[3]

        const product = await ProductModel.findOne({product_id:productId}).exec()
        const user = await UserModel.findOne({id:userId}).exec()
        const shop = await SellerModel.findOne({seller_id:product.seller_id}).exec()
        if(product && user){
            const order = new OrderModel({
                order_id:uuid(),
                product_id:productId,
                seller_id:product.seller_id,
                name:product.name,
                category:product.category,
                description:product.description,
                price:price,
                quantity:quantity,
                product_img:product.img,
                user_id:userId,
                first_name:user.first_name,
                last_name:user.last_name,
                user_email: user.email, 
                owner_id: shop.owner_id,
                shop_name: shop.name,
                owner_name: shop.owner_name,
                owner_email:shop.owner_email,
                ph_number: shop.ph_number,
                shop_img:shop.img,
                gift_wrap:giftWrap,
                gift_description: giftDescription
            })
            order.save(async (err,data)=>{
                if(err) return cb(err,null)
                await CartModel.deleteOne({user_id:userId}).exec()
                return cb(null,"Order Placed")
            })
        }
    } catch (error) {
        return cb(error,null)
    }
}

exports.myOrders = async (payload,cb) => {
    const {id} = payload
    console.log("user id: ",id)
    try {
        const orders = await OrderModel.find({user_id:id}).sort({"createdAt":-1}).exec()
        if(orders){
            return cb(null,orders)
        }
        return cb(null,[])
    } catch (error) {
        return cb(error,null)
    }

}