const kafka = require('./../../kafka/kafka')
const actions = require('./../../actions/actions.json')

exports.addToCart = async (req,res) => {
    const { productId, userId, quantity, price } = req.body
    kafka.sendKafkaRequest('orders',{ productId, userId, quantity, price, action:actions.ADD_TO_CART },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}


exports.getCartItems = async (req, res) => {
    const { userId } = req.body
    kafka.sendKafkaRequest('orders',{ userId, action:actions.GET_CART_ITEMS },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.removeCartItem = async (req, res) => {
    const { userId, productId } = req.body
    kafka.sendKafkaRequest('orders',{ userId,productId, action:actions.REMOVE_FROM_CART },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}