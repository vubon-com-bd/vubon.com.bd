import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

// Real user from earlier registration
const REAL_USER_ID = '81fec371-50c5-4aec-9e04-f81acdef36a4';
const REAL_EMAIL = 'test-1793124042@vubon.com.bd';

const events = [
  { id: `ds-${Date.now()}`, type: 'order.delivery.scheduled', aggregateId: 'del-real-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, name: 'Real User', email: REAL_EMAIL, estimatedAt: '2026-11-05', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `oca-${Date.now()}`, type: 'order.order-cancel.approved', aggregateId: 'ord-real-1', aggregateType: 'Order', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, name: 'Real User', email: REAL_EMAIL, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log(`📧 Expected to: ${REAL_EMAIL}`);
await queue.close();
process.exit(0);
