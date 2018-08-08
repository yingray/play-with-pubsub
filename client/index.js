const PubSub = require('@google-cloud/pubsub');

// Instantiates a client
const pubsubClient = new PubSub({
  projectId: process.env.PROJECT_ID,
});

// The name for the new topic
const topicName = 'yingray-topic';
const subscriptionName = 'my-sub'

// Creates the new topic
pubsubClient
  .topic(topicName)
  .createSubscription(subscriptionName)
  .then(results => {
    const topic = results[0];
    console.log(`Topic ${topic.name} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

const subscription = pubsubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };
  // Listen for new messages until timeout is hit
  subscription.on(`message`, messageHandler);