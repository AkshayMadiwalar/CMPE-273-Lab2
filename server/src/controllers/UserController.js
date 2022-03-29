const UserModel = require('../models/UserModel')
const ProductModel = require('./../models/ProductModel')
const FavoritesModel = require('./../models/FavoritesModel')
const jwt = require('jsonwebtoken')
const config = require('../../config/constants')
const bcrypt = require('bcrypt')
const uuid = require('uuid').v4

exports.createUser = async (req, res) => {
    const { firstName, email, password } = req.body
    try {
        const User = await UserModel.findOne({email}).exec()
        if(User){
            return res.status(400).json({message:"User already registered"})
        }
        const salt = await bcrypt.genSalt(10)
        const encrypted = await bcrypt.hash(password, salt)
        
        const user = new UserModel({
            id:uuid(),
            first_name : firstName,
            email: email,
            password: encrypted
        })

        user.save((err,data) =>{
            if(err) return res.status(500).json({message:"Server Error :"+err})
            return res.json(data)
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error" + error})
    }
}

exports.updateUser = async (req, res) => {
    const {
        id,
        firstName,
        lastName,
        email,
        gender,
        dob,
        city,
        address,
        zipcode,
        country,
        about,
        profileImg
    } = req.body

    try {
        const user = await UserModel.findOne({id}).exec()
        console.log("before updating",user)
        if(user){
            const id = user._id
            user.update({
                first_name:firstName,
                last_name:lastName,
                email:email,
                gender:gender,
                dob:dob,
                city:city,
                address:address,
                zipcode:zipcode,
                country:country,
                about:about,
                profileImg:profileImg
            }, (err,data) => {
                console.log("reached here",err)
                if(err) return res.status(500).json({message:"Server error"})
                return res.json(data)
            })
        }    
    } catch (error) {
        console.log("reached here2 ",error)
        return res.status(500).json({ message: 'Server error' })
    }
}

exports.addToFavorites = async (req, res) => {
    const { id, productId } = req.body
    try {
        const favorite = await FavoritesModel.findOne({id:id,product_id:productId})
        console.log("Favrorite: ",favorite)
        if(favorite==null){
            console.log("1")
            const product = await ProductModel.findOne({product_id:productId}).exec()
            if(product){
                console.log("2")
                const newFavorite = await new FavoritesModel({
                    id,
                    product_id:productId,
                    sellerId: product.seller_id,
                    productName: product.product_name,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    img:product.img
                })
                await newFavorite.save((err,data)=>{
                    console.log("3",err)
                    if(err) return res.status(500).json({message:"Server Error"+err})
                    return res.json(data)
                })
            }else{
                return res.status(500).json({message:"Inavalid Product"})
            }
        }else{
            return res.status(500).json({message:"Already added to Favorites"})
        }
    } catch (error) {
        console.log("error too, ",error)
        return res.status(500).json({ message: "Server error"+error })
    }
}

exports.removeFromFavorites = async (req,res) => {
    const { id, productId } = req.body
    try {
        const data = await FavoritesModel.deleteOne({id:id,product_id:productId}).exec()
        if(data){
            return res.json(data)
        }
        return res.status(500).json({message:"Server Error"+err})
    } catch (error) {
        return res.status(500).json({message:"Server error"+error})
    }
}

exports.myFavorites = async (req,res) => {
    const {id} = req.body
    try {
        const favs = await FavoritesModel.find({id}).exec()
        if(favs){
            return res.json(favs)
        }
        return res.status(500).json({message:"Server error"})
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

// exports.searchFavorite = (req,res) => {
//     const id = req.params.id
//     const productId = req.params.productId
//     try {
//         FavoritesModel.findOne({id,product_id:productId}).exec()

//         FavoritesModel.findByIdAndProductId({id,productId},(err,data)=>{
//             if(err) return res.status(500).json({message:"Server error: "+err})
//             console.log(data)
//             if(data.length>0){
//                 const product = data[0]
//                 return res.json(product)
//             }
//             return res.status(404).json({message:"Product does not exist!"})
//         })
//     } catch (error){
//         return res.status(500).json({message:"Server error: "+error})
//     }
// }