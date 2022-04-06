const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const auth = require('../../middleware/auth')
const passport = require('passport')

router.get('/products',passport.authenticate('jwt',{session:true}),ProductController.getProducts)

module.exports = router