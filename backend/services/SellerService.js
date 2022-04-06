const SellerModel = require('./../models/SellerModel')
const uuid = require('uuid').v4

exports.createSeller = async (payload,cb) => {
    const {name,email,phNumber,currency,city,country,ownerId} = payload
    try {

        const  seller = await new SellerModel({
            seller_id: uuid(),
            owner_id: ownerId,
            name: name,
            email: email,
            ph_number: phNumber,
            currency: currency,
            city: city,
            country:country
        }) 

        await seller.save((err,data)=>{
            if(err) return cb(err,null)
            return cb(null,"Shop created")
        })
    } catch (error) {
        return cb(error,null)
    }
}

exports.updateShop = async (payload,cb) => {
    const {sellerId,name,ownerName,email,phNumber,img} = payload
    
    try {
        const shop = await SellerModel.findOne({seller_id:sellerId}).exec()
        if(shop){
            shop.update({
                name,
                owner_name:ownerName,
                email,
                ph_number:phNumber,
                img:img
            },(err,data) => {
                if(err) return cb(err,null)
                return cb(null,data)
            })
        }
    } catch (error) {
        return cb(error,null)
    }
}

exports.checkAvailability = async (payload,cb) => {
    const {name} = payload
    try {
        const shop = await SellerModel.findOne({name}).exec()
        if(shop) {
            return cb("Name not available",null)
        }
        return cb(null,"Name available")
    } catch (error) {
        return cb(error,null)
    }
}

exports.getShopsByName = async (payload,cb) => {
    const {name} = payload
    try {
        const shop = await SellerModel.findOne({name}).exec()
        if(shop){
            return cb(null,shop)
        }
        return cb("Not found",null)
    } catch (error) {
        return cb(error,null)
    }
}

exports.myShops = async (payload,cb) => {
    const {ownerId} = payload
    try {
        const shops = await SellerModel.find({owner_id:ownerId}).exec()
        if(shops){
            return cb(null,shops)
        }
        return cb("No shops",null)
    } catch (error) {
        return cb(error,null)
    }
}