'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const queue = new AWS.SQS({
	endpoint: process.env.SQS_ENDPOINT,
	region: 'us-east-1'
});

module.exports.queueMessage = async (event) => {
	console.log(JSON.stringify(event));
	const message = {
		QueueUrl: process.env.SQS_URL,
		MessageBody: JSON.stringify(event.pathParameters.message),
		MessageAttributes: { "someAttributte":{StringValue: "someValue", DataType: "String"}},
		MessageDeduplicationId: uuid.v4(),
        MessageGroupId: uuid.v4()
	}
	await queue.sendMessage(message).promise();
	return { statusCode: 200, body: JSON.stringify({"message": `Message ${message.MessageBody} enqueued in ${process.env.SQS_URL}`}) };
}

module.exports.consumeMessage = async (event) => {
	console.log(`Message recieved ${event.Records[0].body}`);

}

module.exports.listQueues = async () => {
	try {
		console.log("Local queues listing");
		console.log(process.env.SQS_ENDPOINT);
		console.log(process.env.SQS_URL);
		const queues = await queue.listQueues().promise();
		return { statusCode: 200, body: JSON.stringify(queues) }
	} catch (e) {
		return { statusCode: 500, body: JSON.stringify({error: e.message})};
	}
}