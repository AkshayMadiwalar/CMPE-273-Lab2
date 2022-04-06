var kafka = require('kafka-node')

exports.getlatestOffset = (topicName,cb) => {
    var client  = new kafka.KafkaClient("localhost:2181")

    var offset = new kafka.Offset(client)
    var latestOffset;
    offset.fetch([{
        topic:topicName,partition:0,time:-1}], function(err,data){
            latestOffset = data[topicName]['0'][0]
            return cb(latestOffset)
        })
}