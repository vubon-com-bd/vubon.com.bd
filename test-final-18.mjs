import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: 'osc', type: 'order.order.status_changed', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', fromStatus: 'pending', toStatus: 'confirmed', locale: 'bn' } },
  { id: 'opk', type: 'order.order.packed', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: 'orf', type: 'order.order.refunded', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', amount: 2500, locale: 'bn' } },
  { id: 'rrj', type: 'order.order-return.rejected', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', reason: 'Used', locale: 'bn' } },
  { id: 'rcl', type: 'order.order-return.closed', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: 'rrc', type: 'order.order-return.received', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: 'rfr', type: 'payment.refund.rejected', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', amount: 2500, reason: 'Policy', locale: 'bn' } },
  { id: 'ivo', type: 'payment.invoice.overdue', payload: { invoiceNumber: 'INV-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', total: 5750, locale: 'bn' } },
  { id: 'ivv', type: 'payment.invoice.voided', payload: { invoiceNumber: 'INV-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: 'pau', type: 'payment.payment.authorized', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', amount: 2500, locale: 'bn' } },
  { id: 'pca', type: 'payment.payment.cancelled', payload: { orderId: 'ORD-1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', amount: 2500, locale: 'bn' } },
  { id: 'vap', type: 'vendor.approval.appealed', payload: { vendorId: 'v1', userId: 'u1', name: 'করিম', email: 'k@test.bd', locale: 'bn' } },
  { id: 'vir', type: 'vendor.approval.info_requested', payload: { vendorId: 'v1', userId: 'u1', name: 'করিম', email: 'k@test.bd', infoRequested: 'Trade license', locale: 'bn' } },
  { id: 'cco', type: 'vendor.commission.calculated', payload: { vendorId: 'v1', userId: 'u1', name: 'করিম', email: 'k@test.bd', amount: 500, locale: 'bn' } },
  { id: 'scm', type: 'vendor.settlement.completed', payload: { vendorId: 'v1', userId: 'u1', name: 'করিম', email: 'k@test.bd', amount: 10000, locale: 'bn' } },
  { id: 'ccr', type: 'cart.cart.created', payload: { cartId: 'c1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: 'ccl', type: 'cart.cart.cleared', payload: { cartId: 'c1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: 'cmg', type: 'cart.cart.merged', payload: { cartId: 'c1', userId: 'u1', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
];

for (const e of events) {
  const eid = `${e.id}-${Date.now()}`;
  await queue.add(e.type, { id: eid, type: e.type, aggregateId: 'agg-1', aggregateType: 'Test', payload: e.payload, occurredAt: new Date().toISOString(), version: 1 }, { jobId: `${eid}__domain-events-notification` });
  console.log(`✅ ${e.type}`);
}
await queue.close();
process.exit(0);
