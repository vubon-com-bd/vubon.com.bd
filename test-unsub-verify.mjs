import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `verify-unsub-${Date.now()}`,
  type: 'order.order.created',
  aggregateId: 'ord-verify-1',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-VERIFY-002',
    userId: 'u-html-1',  // Same user who unsubscribed
    total: 1500,
    currency: 'BDT',
    name: 'সালেহা বেগম',
    locale: 'bn',
    email: 'saleha@vubon.bd',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Verify event enqueued for u-html-1');
await queue.close();
process.exit(0);
