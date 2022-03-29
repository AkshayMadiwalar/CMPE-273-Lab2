const express = require('express')
const router = express.Router()

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const auth = require('../../middleware/auth')

router.get('/products',auth,ProductController.getProducts)

module.exports = router