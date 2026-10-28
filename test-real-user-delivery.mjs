import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

// Real user just registered
const REAL_USER_ID = '6e61edad-4056-4e21-828d-1603ef051d3b';

const events = [
  { id: `dpu-${Date.now()}`, type: 'order.delivery.picked_up', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, trackingNumber: 'TN-REAL-01', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `off-${Date.now()}`, type: 'order.order-fulfillment.fulfilled', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type} → user ${REAL_USER_ID}`);
}
console.log('');
console.log('⏳ Wait 15s for SMTP send...');
await queue.close();
process.exit(0);
