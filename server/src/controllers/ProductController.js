const elasticClient = require('./../../config/ElasticClient')

const kafka = require('./../../kafka/kafka')
const actions = require('./../../actions/actions.json')

exports.create = async (req,res)=>{
    const {sellerId,name,category,description,price,quantity,img} = req.body
    kafka.sendKafkaRequest('products',{ sellerId,name,category,description,price,quantity,img, action:actions.CREATE_PRODUCT},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
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
    kafka.sendKafkaRequest('products',{ elasticId,productId,name,category,description,price,quantity,img, action:actions.EDIT_PRODUCT},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getItems = async (req,res) => {
    const {sellerId} = req.body
    kafka.sendKafkaRequest('products',{ sellerId, action:actions.GET_ITEMS},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getProducts = async (req,res) => {
    kafka.sendKafkaRequest('products',{  action:actions.GET_PRODUCTS},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getProductById = async (req,res) => {
    const productId = req.params.id
    kafka.sendKafkaRequest('products',{ productId, action:actions.GET_PRODUCT_BY_ID},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getProductsByCategory = (req,res) => {
    const {category} = req.body
    kafka.sendKafkaRequest('products',{ category, action:actions.GET_PRODUCTS_BY_CATEGORY},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getFIlteredProducts = (req,res) => {
    const {category,price} = req.body
    kafka.sendKafkaRequest('products',{ category,price, action:actions.GET_FILTERED_PRODUCTS},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.filteredProductsSortByPrice = (req,res) => {
    const {category,price,order} = req.body
    kafka.sendKafkaRequest('products',{ category,price,order, action:actions.GET_FILTERED_PRODUCTS_SORT_BY_PRICE},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.filteredProductsSortByQuantity = (req,res) => {
    const {category,price,quantity,order} = req.body
    kafka.sendKafkaRequest('products',{ category,price,quantity,order, action:actions.GET_FILTERED_PRODUCTS_SORT_BY_QUANTITY},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.filteredProductsSortBySales = (req,res) => {
    const {category,price,order} = req.body
    kafka.sendKafkaRequest('products',{ category,price,order, action:actions.GET_FILTERED_PRODUCTS_SORT_BY_SALES},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}