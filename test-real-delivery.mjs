import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

// ⚠️ USER_ID from register output এর উপরে paste করুন
const REAL_USER_ID = process.argv[2];

if (!REAL_USER_ID) {
  console.error('❌ Usage: node test-real-delivery.mjs <USER_ID>');
  process.exit(1);
}

const events = [
  { id: `dpu-${Date.now()}`, type: 'order.delivery.picked_up', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, trackingNumber: 'TN-REAL-01', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `dit-${Date.now()}`, type: 'order.delivery.in_transit', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, trackingNumber: 'TN-REAL-01', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `off-${Date.now()}`, type: 'order.order-fulfillment.fulfilled', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `dofd-${Date.now()}`, type: 'order.delivery.out_for_delivery', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-REAL-001', userId: REAL_USER_ID, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type} → user ${REAL_USER_ID}`);
}
console.log('');
console.log('⏳ Wait 15s for SMTP send...');
console.log('📧 Check Gmail: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
