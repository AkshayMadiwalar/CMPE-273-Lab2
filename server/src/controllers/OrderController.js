const kafka = require('./../../kafka/kafka')
const actions = require('./../../actions/actions.json')

exports.placeOrder = async (req,res) => {
    const {elasticId,productId,userId,price,quantity,giftWrap,giftDescription} = req.body
    kafka.sendKafkaRequest('orders',{ elasticId,productId,userId,price,quantity,giftWrap,giftDescription,action:actions.PLACE_ORDER},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.myOrders = (req,res) => {
    const {id} = req.body
    kafka.sendKafkaRequest('orders',{ id, action:actions.MY_ORDERS},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}
