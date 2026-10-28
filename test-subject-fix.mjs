import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { type: 'order.delivery.scheduled', payload: { orderId: 'ORD-DLV-123', userId: 'u1', name: 'Jewel Ahmed', email: 'mdjewel24682468@gmail.com', estimatedAt: '2026-10-30', locale: 'bn' } },
  { type: 'order.order-cancel.requested', payload: { orderId: 'ORD-CNL-456', userId: 'u1', name: 'Jewel Ahmed', email: 'mdjewel24682468@gmail.com', reason: 'ভুল পণ্য', locale: 'bn' } },
  { type: 'order.order-return.refunded', payload: { orderId: 'ORD-RET-789', userId: 'u1', name: 'Jewel Ahmed', email: 'mdjewel24682468@gmail.com', amount: 2500, currency: 'BDT', locale: 'bn' } },
];

for (const evt of events) {
  const id = `${evt.type}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
  await queue.add(evt.type, {
    id,
    type: evt.type,
    aggregateId: id,
    aggregateType: 'Test',
    payload: evt.payload,
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `${id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log('📧 Check: mdjewel24682468@gmail.com');
console.log('⏳ Wait 10s for SMTP...');
await queue.close();
process.exit(0);
