const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const OrderController = require('./../controllers/OrderController')
const CartController = require('./../controllers/CartController')
const passport = require('passport')
const auth = require('../../middleware/auth')

router.post('/place-order',passport.authenticate('jwt',{session:true}),OrderController.placeOrder)
router.post('/add-to-cart',passport.authenticate('jwt',{session:true}),CartController.addToCart)
router.post('/cart-items',passport.authenticate('jwt',{session:true}),CartController.getCartItems)
router.post('/cart/remove-item',passport.authenticate('jwt',{session:true}),CartController.removeCartItem)

module.exports = router