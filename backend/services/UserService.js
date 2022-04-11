const uuid = require('uuid').v4
const UserModel = require('./../models/UserModel')
const FavoritesModel = require('./../models/FavoritesModel')
const ProductModel = require('./../models/ProductModel')
const bcrypt = require('bcrypt')

exports.createUser = async (payload, cb) => {
    const { firstName, email, password } = payload
    try {
        const User = await UserModel.findOne({email}).exec()
        if(User){
            return cb("ALready registered",null)
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
            console.log(err)
            if(err) return cb(err,null)
            return cb(null,data)
        })

    } catch (error) {
        console.log(error)
        return cb(error,null)
    }
}

exports.updateUser = async (payload,cb) => {
    console.log("------payload-", payload)
    const {
        id,
        firstName,
        lastName,
        email,
        gender,
        dob,
        city,
        address,
        zip_code,
        country,
        about,
        profileImg
    } = payload

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
                zip_code:zip_code,
                country:country,
                about:about,
                profile_img:profileImg
            }, (err,data) => {
                if(err) return cb(err,null)
                return cb(null,data)
            })
        }    
    } catch (error) {
        return cb(error,null)
    }
}

exports.addToFavorites = async (payload,cb) => {
    const { id, productId } = payload
    try {
        const favorite = await FavoritesModel.findOne({id:id,product_id:productId})
        if(favorite==null){
            const product = await ProductModel.findOne({product_id:productId}).exec()
            if(product){
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
                    if(err) return cb(err,null)
                    return cb(null,data)
                })
            }else{
                return cb("Invalid Product",null)
            }
        }else{
            return cb("Already added to favorites",null)
        }
    } catch (error) {
        return cb(error,null)
    }
}

exports.removeFromFavorites = async (payload,cb) => {
    const { id, productId } = payload

    try {
        const data = await FavoritesModel.deleteOne({id:id,product_id:productId}).exec()
        if(data){
            return cb(null,data)
        }
        return cb("Does not exist",null)
    } catch (error) {
        return cb(error,null)
    }
}

exports.myFavorites = async (payload,cb) => {
    const {id} = payload
    try {
        const favs = await FavoritesModel.find({id}).exec()
        if(favs){
            return cb(null,favs)
        }
        return cb("No Favorites",null)
    } catch (error) {
        return cb(error,null)
    }
}