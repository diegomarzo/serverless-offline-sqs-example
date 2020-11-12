# SLS Offline SQS Example template

SQS Offline integration with ElasticMQ

There are 3 Lambdas:

1) HTTP Endpoint to enqueue messages: http://localhost:3000/dev/queueMessage/{message}

2) SQS Consumer to consume messages produced by Lambda 1: this lambda will print in the output console the results of messages consumption

3) Monitoring Lambda to check that ElasticMQ is up, running and with the queues created: http://localhost:3000/dev/listQueues

The first time run:

`npm install`

To start the system:

`npm run start` OR `sls offline start`
