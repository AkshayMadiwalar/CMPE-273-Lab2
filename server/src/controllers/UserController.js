const kafka = require('./../../kafka/kafka')
const actions = require('./../../actions/actions.json')

exports.createUser = async (req, res) => {
    const { firstName, email, password } = req.body
    kafka.sendKafkaRequest('users',{ firstName, email, password, action:actions.CREATE_USER },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
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
    kafka.sendKafkaRequest('users',{         
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
        profileImg, 
        action:actions.UPDATE_USER},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.addToFavorites = async (req, res) => {
    const { id, productId } = req.body
    kafka.sendKafkaRequest('favorites',{ id, productId, action:actions.ADD_TO_FAVORITES },(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.removeFromFavorites = async (req,res) => {
    const { id, productId } = req.body
    kafka.sendKafkaRequest('favorites',{ id, productId, action:actions.REMOVE_FROM_FAVORITES},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.myFavorites = async (req,res) => {
    const { id } = req.body
    kafka.sendKafkaRequest('favorites',{ id, action:actions.MY_FAVORITES},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
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