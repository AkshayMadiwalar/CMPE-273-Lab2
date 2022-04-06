var kafka = require('kafka-node')

const latestoffset = require('./latest-offset')

exports.getProducer = () => {
    var client = new kafka.KafkaClient("localhost:2181");
    var HighlevelProducer = kafka.HighLevelProducer;
    return new HighlevelProducer(client)
}

exports.getConsumer = (topicName,results) => {

    var lOffset;
    latestoffset.getlatestOffset(topicName, function (returnValue) {
        lOffset = returnValue

        var client = new kafka.KafkaClient("localhost:2181")
        var Consumer = kafka.Consumer

        var options = {
            groupId: 'orders-group',
            fromOffset: 'latest'
        };

        var kafkaConsumer = new Consumer(client, [
            { topic: topicName, offset: lOffset, partition: 0 },
        ], options,
            {
                autoCommit: false 
            })
        return results(kafkaConsumer)
    })
}