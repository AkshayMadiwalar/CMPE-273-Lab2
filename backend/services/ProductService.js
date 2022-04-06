const ProductModel = require('./../models/ProductModel')
const uuid = require('uuid').v4

exports.createProduct = async (payload,cb) => {
    const {sellerId,name,category,description,price,quantity,img} = payload
    try {
        const product = new ProductModel({
            product_id: uuid(),
            seller_id:sellerId,
            name,
            category,
            description,
            price,
            quantity,
            img
        })

        await product.save((err,data)=>{
            if(err) return cb(err,null)
            return cb(null,"Product Added")
        })

    } catch (error) {
        return cb(error,null)
    }
}

exports.editProduct = async (payload,cb) => {
    const {elasticId,productId,name,category,description,price,quantity,img} = payload
    try {
        const product = await ProductModel.findOne({product_id:productId}).exec()
        if(product){
            product.update({
                name,category,description,price,quantity,img
            },(err,data) => {
                if(err) return cb(err,null)
                return cb(null,"Product Updated")
            })
        }
    } catch (error) {
        return cb(error,null)
    }
}

exports.getItems = async (payload,cb) => {
    const {sellerId} = payload
    try {
        const products = await ProductModel.find({seller_id:sellerId}).exec()
        if(products){
            return cb(null,products)
        }
        return cb("No Products found",null)
    } catch (error) {
        return cb(error,null)
    }
}

exports.getProducts = async (payload,cb) => {
    try {
        const products = await ProductModel.find().exec()

        if(products){
            return cb(null,products)
        }
        return cb("No products",null)

    } catch (error) {
        return cb(error,null)
    }
}

exports.getProductById = async (payload,cb) => {
    const {productId} = payload
    try {
        const product = await ProductModel.findOne({product_id:productId}).exec()
        if(product){
            return cb(null,product)
        }
        return cb("No product found",null)
    } catch (error) {
        return cb(error,null)
    }
}

exports.getProductsByCategory = async (payload,cb) => {
    const {category} = payload
    try {
        ProductModel.find({category},(err,data) => {
            if(err) cb(err,null)
            if(data)
                return cb(null,data)
        })
    } catch (error) {
        return cb(error,null)
    }
}

exports.getFilteredProducts =async (payload,cb) => {
    const {category,price} = payload
    try {
        ProductModel.find({category,price},(err,data)=>{
            if(err) return cb(err,null)
            return cb(null,data)
        })
    } catch (error) {
        return cb(error,null)
    }
}

exports.getFilteredProductsSortByPrice = async (payload,cb) => {
    const {category,price,order} = payload
    try {
        ProductModel.find({category,price},(err,data)=>{
            if(err) return cb(err,null)
            return cb(null,data)
        })
    } catch (error) {
        return cb(error,null)
    }
}

exports.getFilteredProductsSortByQuantity = async (payload,cb) => {
    const {category,price,quantity,order} = payload
    try {
        ProductModel.find({category,price,quantity},(err,data)=>{
            if(err) return cb(err,null)
            return cb(null,data)
        })
    } catch (error) {
        return cb(error,null)
    }
}

exports.getFilteredProductsSortBySales = async (payload,cb) => {
    const {category,price,order} = payload
    try {
        ProductModel.productsSortBySales({category,price,order},(err,data)=>{
            if(err) return cb(err,null)
            return cb(null,data)
        })
    } catch (error) {
        return cb(error,null)
    }  
}