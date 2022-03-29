const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const OrderController = require('./../controllers/OrderController')
const CartController = require('./../controllers/CartController')

const auth = require('../../middleware/auth')

router.post('/by-category',auth,ProductController.getProductsByCategory)
router.post('/filter',auth,ProductController.getFIlteredProducts)
router.post('/sort-by-price',auth,ProductController.filteredProductsSortByPrice)
router.post('/sort-by-quantity',auth,ProductController.filteredProductsSortByQuantity)
router.post('/sort-by-sales',auth,ProductController.filteredProductsSortBySales)
router.get('/:search',ProductController.getProduct)

module.exports = router