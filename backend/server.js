const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const PORT = 8282

//Mongo connect
mongo.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{console.log(err)})


//consume kafka messages
require('./kafka/consume')
require('./kafka/UserConsumer')
require('./kafka/FavoritesConsumer')
require('./kafka/SellerConsumer')
require('./kafka/ProductConsumer')
require('./kafka/OrderConsumer')



app.listen(PORT,(req,res) => {
    console.log("--Backend, kafka conusmers running---")
}) 

