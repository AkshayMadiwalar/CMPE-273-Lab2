const elastic = require('elasticsearch')

const elasticClient = elastic.Client({
    host:'localhost:9200'
})

module.exports = elasticClient