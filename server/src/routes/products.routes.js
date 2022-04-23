const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const OrderController = require('./../controllers/OrderController')
const CartController = require('./../controllers/CartController')

const auth = require('../../middleware/auth')

const passport = require('passport')

router.post('/by-category',passport.authenticate('jwt',{session:true}),ProductController.getProductsByCategory)
router.post('/filter',passport.authenticate('jwt',{session:true}),ProductController.getFIlteredProducts)
router.post('/sort-by-price',passport.authenticate('jwt',{session:true}),ProductController.filteredProductsSortByPrice)
router.post('/sort-by-quantity',passport.authenticate('jwt',{session:true}),ProductController.filteredProductsSortByQuantity)
router.post('/sort-by-sales',passport.authenticate('jwt',{session:true}),ProductController.filteredProductsSortBySales)
router.get('/:search',passport.authenticate('jwt',{session:true}),ProductController.getProduct)

module.exports = router