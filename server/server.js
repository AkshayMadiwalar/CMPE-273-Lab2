const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongoose')
const dotenv = require('dotenv');
const passport = require('passport')

dotenv.config();

app.use(cors())
app.use(passport.initialize())

require('./src/controllers/passport.js')

mongo.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{console.log(err)})
 

//Init Middleware
app.use(express.json({extended:false}))

app.use('/api/users',require('./src/routes/user.routes'))
app.use('/api/shop',require('./src/routes/seller.routes'))
app.use('/api/dashboard',require('./src/routes/dashboard.routes'))
app.use('/api/order',require('./src/routes/order.routes'))
app.use('/api/products',require('./src/routes/products.routes'))

const PORT = process.env.PORT || 8585


app.listen(PORT,(req,res)=>{
    console.log("Srever running on port 8585")
})

module.exports = app