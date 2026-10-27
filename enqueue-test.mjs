import { Queue } from 'bullmq';

const QUEUE_NAME = 'domain-events-payment';

const connection = {
  host: '127.0.0.1',
  port: 6379,
};

const queue = new Queue(QUEUE_NAME, { connection });

const eventPayload = {
  id: 'test-event-' + Date.now(),
  type: 'order.order.created',
  aggregateId: '11111111-1111-4111-8111-111111111111',
  aggregateType: 'Order',
  payload: {
    orderId: '11111111-1111-4111-8111-111111111111',
    orderNumber: 'ORD-TEST-' + Date.now(),
    customerId: '81fec371-50c5-4aec-9e04-f81acdef36a4',
    totalAmount: 500,
    currency: 'BDT',
    itemCount: 1,
    createdAt: new Date().toISOString(),
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

const job = await queue.add(eventPayload.type, eventPayload, {
  jobId: `${eventPayload.id}__${QUEUE_NAME}`,
});

console.log('✅ Job enqueued:', job.id);
console.log('Event type:', eventPayload.type);
console.log('Order ID:', eventPayload.payload.orderId);

await queue.close();
process.exit(0);
