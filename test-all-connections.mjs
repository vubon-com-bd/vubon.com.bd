import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const USER = '00000000-0000-4000-8000-000000000001';

async function publish(queueName, event) {
  const q = new Queue(queueName, { connection });
  await q.add(event.type, event, { jobId: `${event.id}__${queueName}` });
  await q.close();
}

// ═══════════════════════════════════════════════════════════════
// Test: payment.refunded → cart
// ═══════════════════════════════════════════════════════════════
await publish('domain-events-cart', {
  id: `evt-refunded-${Date.now()}`,
  type: 'payment.payment.refunded',
  aggregateId: 'PAY-REF-1',
  aggregateType: 'Payment',
  payload: { paymentId: 'PAY-REF-1', orderId: 'ORD-1', userId: USER, amount: 2500, currency: 'BDT' },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ payment.payment.refunded → cart`);

// ═══════════════════════════════════════════════════════════════
// Test: identity.user.deleted → cart
// ═══════════════════════════════════════════════════════════════
await publish('domain-events-cart', {
  id: `evt-user-del-${Date.now()}`,
  type: 'identity.user.deleted',
  aggregateId: USER,
  aggregateType: 'User',
  payload: { userId: USER, email: 'test@vubon.bd', deletedAt: new Date().toISOString(), reason: 'GDPR' },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ identity.user.deleted → cart`);

// ═══════════════════════════════════════════════════════════════
// Test: identity.user.status_changed (suspended) → cart
// ═══════════════════════════════════════════════════════════════
await publish('domain-events-cart', {
  id: `evt-user-status-${Date.now()}`,
  type: 'identity.user.status_changed',
  aggregateId: USER,
  aggregateType: 'User',
  payload: { userId: USER, fromStatus: 'active', toStatus: 'suspended', reason: 'policy' },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ identity.user.status_changed (suspended) → cart`);

// ═══════════════════════════════════════════════════════════════
// Test: order.order.completed → cart
// ═══════════════════════════════════════════════════════════════
await publish('domain-events-cart', {
  id: `evt-order-complete-${Date.now()}`,
  type: 'order.order.completed',
  aggregateId: 'ORD-2',
  aggregateType: 'Order',
  payload: { orderId: 'ORD-2', userId: USER },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ order.order.completed → cart`);

// ═══════════════════════════════════════════════════════════════
// Test: order.order.returned → cart
// ═══════════════════════════════════════════════════════════════
await publish('domain-events-cart', {
  id: `evt-order-return-${Date.now()}`,
  type: 'order.order.returned',
  aggregateId: 'ORD-3',
  aggregateType: 'Order',
  payload: { orderId: 'ORD-3', userId: USER, returnId: 'RET-1' },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ order.order.returned → cart`);

// ═══════════════════════════════════════════════════════════════
// Test: order.order.refunded → cart
// ═══════════════════════════════════════════════════════════════
await publish('domain-events-cart', {
  id: `evt-order-refund-${Date.now()}`,
  type: 'order.order.refunded',
  aggregateId: 'ORD-4',
  aggregateType: 'Order',
  payload: { orderId: 'ORD-4', userId: USER, amount: 1000 },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ order.order.refunded → cart`);

console.log('');
console.log('⏳ Waiting 5s for all handlers...');
await new Promise(r => setTimeout(r, 5000));
process.exit(0);
