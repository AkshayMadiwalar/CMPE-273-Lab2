const ProductModel = require('./../models/ProductModel')
const elasticClient = require('./../../config/ElasticClient')
const uuid = require('uuid').v4

exports.create = async (req,res)=>{
    const {sellerId,name,category,description,price,quantity,img} = req.body
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
            if(err) return res.status(500).json({message:"Server error : \n"+ err})
            return res.json({message:"Product added"})
        })

    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.getProduct = (req,res) => {
    console.log(req.params.search)
    const searchParameter = req.params.search
    let query = {
        index : 'products'
    }
    if(searchParameter){
        query.q = `*${searchParameter}*`
    }
    elasticClient.search(query).then(resp=>{
        return res.json({
            products: resp.hits.hits
        })
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({
            message:err
        })
    })

}   

exports.editProduct = async (req,res) => {
    const {elasticId,productId,name,category,description,price,quantity,img} = req.body
    try {
        const product = await ProductModel.findOne({product_id:productId}).exec()
        if(product){
            product.update({
                name,category,description,price,quantity,img
            },(err,data) => {
                if(err) return res.status(500).json({message:"Server error : \n"+ err})
                return res.json({message:"Product updated"})
            })
        }
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.getItems = async (req,res) => {
    const {sellerId} = req.body
    try {
        const products = await ProductModel.find({seller_id:sellerId}).exec()
        if(products){
            return res.json(products)
        }
        return res.status(500).json({message:"Server error"+err})
    } catch (error) {
        return res.status(500).json({message:"Server error"+error})
    }
}

exports.getProducts = (req,res) => {
    try {
        ProductModel.getAll({},(err,data)=>{
            if(err) return res.status(500).json({message:"Server Error"})
            if(data)   return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.getProductById = async (req,res) => {
    const productId = req.params.id
    try {
        const product = await ProductModel.findOne({product_id:productId}).exec()
        if(product){
            return res.json(product)
        }
        return res.status(404).send("No product found")
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.getProductsByCategory = (req,res) => {
    const {category} = req.body
    try {
        ProductModel.getProductsByCategory({category},(err,data) => {
            if(err) return res.status(500).json({message:"Server Error"})
            if(data)
                return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.getFIlteredProducts = (req,res) => {
    const {category,price} = req.body
    try {
        ProductModel.getProductsByFilter({category,price},(err,data)=>{
            if(err) return res.status(500).json({message:"Server Error"+err})
            return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:"Server Error"+ error})
    }
}

exports.filteredProductsSortByPrice = (req,res) => {
    const {category,price,order} = req.body
    try {
        ProductModel.productsSortByPrice({category,price,order},(err,data)=>{
            if(err) return res.status(500).json({message:"Server Error"+err})
            return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:"Server Error"+error})
    }
}

exports.filteredProductsSortByQuantity = (req,res) => {
    const {category,price,quantity,order} = req.body
    try {
        ProductModel.productsSortByQuantity({category,price,quantity,order},(err,data)=>{
            if(err) return res.status(500).json({message:"Server Error"})
            return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
}

exports.filteredProductsSortBySales = (req,res) => {
    const {category,price,order} = req.body
    try {
        ProductModel.productsSortBySales({category,price,order},(err,data)=>{
            if(err) return res.status(500).json({message:"Server Error"})
            return res.json(data)
        })
    } catch (error) {
        return res.status(500).json({message:"Server Error"})
    }
}