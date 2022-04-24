const kafkaConection = require('./connect')
const actions = require('./../actions/actions.json')

const CartService = require('./../services/CartService')
const OrderService = require('./../services/OrderService')

kafkaConection.getConsumer('orders',(consumer) => {
    
    var producer = kafkaConection.getProducer()

    consumer.on('message', function(message){
        var data = JSON.parse(message.value)
        const {payload,correlationId} = data 
        const { action } = payload
        
        console.log("1. Cosumed Data at backend...",action)

        if(action == actions.ADD_TO_CART){
            
            CartService.addToCart(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("---Sent Acknowledegemt---\n",data)
                })
            })
        }


        if(action == actions.GET_CART_ITEMS){
            
            CartService.getCartItems(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("---Sent Acknowledegemt---\n",data)
                })
            })
        }

        if(action == actions.REMOVE_FROM_CART){
            
            CartService.removeCartItem(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("---Sent Acknowledegemt---\n",data)
                })
            })
        }

        if(action == actions.PLACE_ORDER){
            
            OrderService.placeOrder(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("---Sent Acknowledegemt---\n",data)
                })
            })
        }

        if(action == actions.MY_ORDERS){
            
            OrderService.myOrders(payload,(err,res) => {
                var payload = {}
                if(err){
                    console.log("Serivce failed, ERR: ",err)
                   payload ={
                    status: 400,
                    content : err,
                    correlationId:correlationId
                   } 
                }
        
                if(res){
                    payload = {
                        status:200,
                        content:res,
                        correlationId:correlationId
                    }
                }
        
                //Send Response to acknowledge topic
                payloads = [
                    {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
                ]
                producer.send(payloads,(err,data)=>{
                    if(err) throw err
                    console.log("---Sent Acknowledegemt---\n",data)
                })
            })
        }
    })
})