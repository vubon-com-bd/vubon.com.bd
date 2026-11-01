import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const USER_ID = '00000000-0000-4000-8000-000000000001';

const events = [
  { id: `dpu-${Date.now()}`, type: 'order.delivery.picked_up', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-REAL-001', userId: USER_ID, trackingNumber: 'TN-REAL-01', name: 'Jewel Ahmed', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `off-${Date.now()}`, type: 'order.order-fulfillment.fulfilled', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-REAL-001', userId: USER_ID, name: 'Jewel Ahmed', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log('⏳ Wait 12s for SMTP send...');
console.log('📧 Check: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
