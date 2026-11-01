import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  {
    id: `test-cancel-${Date.now()}`,
    type: 'order.order.cancelled',
    aggregateId: 'order-001',
    aggregateType: 'Order',
    payload: {
      orderId: 'ORD-CANCEL-001',
      userId: '00000000-0000-4000-8000-000000000001',
      name: 'রহিম উদ্দিন',
      email: 'mdjewel24682468@gmail.com',
      reason: 'গ্রাহক অনুরোধ',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `test-refund-${Date.now()}`,
    type: 'order.order.refunded',
    aggregateId: 'order-002',
    aggregateType: 'Order',
    payload: {
      orderId: 'ORD-REFUND-002',
      userId: '00000000-0000-4000-8000-000000000001',
      name: 'রহিম উদ্দিন',
      email: 'mdjewel24682468@gmail.com',
      amount: 2500,
      currency: 'BDT',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

console.log('');
console.log('📧 Check: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
