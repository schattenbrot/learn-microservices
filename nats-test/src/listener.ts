import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

console.clear();

const clientId = randomBytes(4);

const stan = nats.connect('ticketing', clientId.toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('Listener disconnected from NATS');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('ordersService');
  const subscription = stan.subscribe(
    'ticket:created',
    'ordersServiceQueueGroup',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(
        `Received event number #${msg.getSequence()}, with data: ${data}`
      );
      msg.ack();
    }
  });
});

process.on('SIGINT', () => {
  stan.close();
});
process.on('SIGTERM', () => {
  stan.close();
});
