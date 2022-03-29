const SellerModel = require('./../models/SellerModel')
const uuid = require('uuid').v4

exports.createSeller = async (req,res) => {
    const {name,email,phNumber,currency,city,country} = req.body
    const ownerId = req.user.id
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
            if(err) return res.status(500).json({message:"Server error"+err})
            return res.json({message:"Shop created"})
        })
    } catch (error) {
        return res.status(500).json({message:"Server error"+error})
    }
}

exports.updateShop = async (req,res) => {
    const {sellerId,name,ownerName,email,phNumber,img} = req.body
    
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
                if(err) return res.status(500).json({message:"Server error: "+err})
                return res.json({message:"Shop Updated"})
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server error: "+error})
    }
}

exports.checkAvailability = async (req,res) => {
    const {name} = req.body
    try {
        const shop = await SellerModel.findOne({name}).exec()
        if(shop) {
            return res.status(201).json({message:"Name not Available"})
        }
        return res.json({message:"Name Available"})
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.getShopByName = async (req,res) => {
    const {name} = req.body
    try {
        const shop = await SellerModel.findOne({name}).exec()
        if(shop){
            return res.json(shop)
        }
        return res.status(404).json({message:"Not Found"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server error"})
    }
}

exports.myShops = async (req,res) => {
    const {ownerId} = req.body
    try {

        const shops = await SellerModel.find({owner_id:ownerId}).exec()
        if(shops){
            return res.json(shops)
        }
        return res.status(500).json({message:"Server error"+err})
    } catch (error) {
        return res.status(500).json({message:"Server error"+error})
    }
}