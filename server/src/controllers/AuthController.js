const kafka = require('./../../kafka/kafka')

const actions = require('./../../actions/actions.json')

exports.login = async (req, res) => {
    const { email, password } = req.body
    kafka.sendKafkaRequest('users',{email, password, action:actions.LOGIN},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}

exports.getUserDetails = async (req,res) => {
    const id = req.user.id
    kafka.sendKafkaRequest('users',{id, action:actions.GET_USER_DETAILS},(err,data) =>{
        if(err) return res.status(400).json({message:err})
        return res.json(data)
    })
}