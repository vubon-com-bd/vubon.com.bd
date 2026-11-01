import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `fresh-user-${Date.now()}`,
  type: 'order.order.created',
  aggregateId: 'ord-fresh-1',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-FRESH-001',
    userId: 'u-fresh-test-99',
    total: 3000,
    currency: 'BDT',
    name: 'নতুন গ্রাহক',
    locale: 'bn',
    email: 'new@vubon.bd',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Fresh user event enqueued');
console.log('User: u-fresh-test-99');
console.log('Order: ORD-FRESH-001');
await queue.close();
process.exit(0);
