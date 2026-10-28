import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `html-test-${Date.now()}`,
  type: 'order.order.created',
  aggregateId: 'ord-html-1',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-HTML-001',
    userId: 'u-html-1',
    total: 3500,
    currency: 'BDT',
    name: 'সালেহা বেগম',
    locale: 'bn',
    email: 'saleha@vubon.bd',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Event enqueued:', event.type);
console.log('Customer:', event.payload.name);
console.log('Order:', event.payload.orderId);
console.log('Amount:', event.payload.total, event.payload.currency);
await queue.close();
process.exit(0);
