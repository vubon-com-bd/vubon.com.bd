import { Queue } from 'bullmq';

const QUEUE_NAME = 'domain-events-notification';

const connection = { host: '127.0.0.1', port: 6379 };

const queue = new Queue(QUEUE_NAME, { connection });

const eventPayload = {
  id: 'test-bn-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-bn-test',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-BN-001',
    userId: '00000000-0000-4000-8000-000000000001',
    total: 5000,
    currency: 'BDT',
    name: 'রহিম উদ্দিন',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

const job = await queue.add(eventPayload.type, eventPayload, {
  jobId: `${eventPayload.id}__${QUEUE_NAME}`,
});

console.log('✅ Job enqueued:', job.id);
console.log('Event type:', eventPayload.type);
console.log('Locale:', eventPayload.payload.locale);
console.log('Customer:', eventPayload.payload.name);
console.log('Order:', eventPayload.payload.orderId);
console.log('Total:', eventPayload.payload.total, eventPayload.payload.currency);

await queue.close();
process.exit(0);
