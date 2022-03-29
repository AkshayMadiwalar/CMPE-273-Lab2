const express = require('express')
const router = express.Router()
const passport = require('passport')

const SellerController = require('./../controllers/SellerController')
const ProductController = require('./../controllers/ProductController')
const auth = require('../../middleware/auth')

router.post('/add',passport.authenticate('jwt',{session:true}),SellerController.createSeller)
router.post('/myshops',passport.authenticate('jwt',{session:true}),SellerController.myShops)
router.post('/update',passport.authenticate('jwt',{session:true}),SellerController.updateShop)
router.post('/addItem',passport.authenticate('jwt',{session:true}),ProductController.create)
router.post('/updateItem',passport.authenticate('jwt',{session:true}),ProductController.editProduct)
router.post('/getItems',passport.authenticate('jwt',{session:true}),ProductController.getItems)
router.post('/check-availablity',passport.authenticate('jwt',{session:true}),SellerController.checkAvailability)
router.post('/byname',passport.authenticate('jwt',{session:true}),SellerController.getShopByName)

module.exports = router