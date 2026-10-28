import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `cs-${Date.now()}`, type: 'order.checkout.started', aggregateId: 'chk-1', aggregateType: 'Checkout', payload: { checkoutId: 'CHK-001', userId: 'u1', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `csc-${Date.now()}`, type: 'order.checkout.step_changed', aggregateId: 'chk-1', aggregateType: 'Checkout', payload: { checkoutId: 'CHK-001', userId: 'u1', name: 'রহিম', fromStep: 'address', toStep: 'payment', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `fc-${Date.now()}`, type: 'order.order-fulfillment.cancelled', aggregateId: 'ord-3', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-03', userId: 'u1', name: 'করিম', reason: 'স্টক নেই', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `pf-${Date.now()}`, type: 'order.order-fulfillment.partially_fulfilled', aggregateId: 'ord-3', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-03', userId: 'u1', name: 'করিম', fulfilledItems: 2, totalItems: 3, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `rs-${Date.now()}`, type: 'order.order-fulfillment.restocked', aggregateId: 'ord-3', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-03', userId: 'u1', name: 'করিম', productName: 'চার্জার', quantity: 1, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `tlu-${Date.now()}`, type: 'order.order-tracking.location_updated', aggregateId: 'trk-1', aggregateType: 'Tracking', payload: { orderId: 'ORD-FINAL-03', userId: 'u1', name: 'করিম', location: 'ঢাকা হাব', trackingNumber: 'TN-FINAL-03', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `tsc-${Date.now()}`, type: 'order.order-tracking.status_changed', aggregateId: 'trk-1', aggregateType: 'Tracking', payload: { orderId: 'ORD-FINAL-03', userId: 'u1', name: 'করিম', fromStatus: 'picked_up', toStatus: 'in_transit', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log('⏳ Wait 5s for handlers to fire...');
await queue.close();
process.exit(0);
