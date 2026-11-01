import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `pf-${Date.now()}`, type: 'payment.payment.failed', aggregateId: 'pay-1', aggregateType: 'Payment', payload: { paymentId: 'pay-1', orderId: 'ORD-001', userId: 'u1', amount: 1500, currency: 'BDT', reason: 'Insufficient funds', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `pr-${Date.now()}`, type: 'payment.payment.refunded', aggregateId: 'pay-1', aggregateType: 'Payment', payload: { paymentId: 'pay-1', orderId: 'ORD-001', userId: 'u1', amount: 1500, currency: 'BDT', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `us-${Date.now()}`, type: 'identity.user.suspended', aggregateId: 'u1', aggregateType: 'User', payload: { userId: 'u1', reason: 'Policy violation', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `vr-${Date.now()}`, type: 'vendor.vendor.registered', aggregateId: 'v1', aggregateType: 'Vendor', payload: { vendorId: 'v1', userId: 'u1', businessName: 'রহিমের দোকান', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `va-${Date.now()}`, type: 'vendor.approval.approved', aggregateId: 'v1', aggregateType: 'Vendor', payload: { vendorId: 'v1', userId: 'u1', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ca-${Date.now()}`, type: 'cart.cart.abandoned', aggregateId: 'c1', aggregateType: 'Cart', payload: { cartId: 'c1', userId: 'u1', itemCount: 3, abandonedAt: new Date().toISOString(), name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ils-${Date.now()}`, type: 'product.inventory.low_stock_alert', aggregateId: 'p1', aggregateType: 'Product', payload: { productId: 'p1', available: 5, threshold: 10, name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `rvs-${Date.now()}`, type: 'product.review.submitted', aggregateId: 'p1', aggregateType: 'Product', payload: { reviewId: 'rv1', productId: 'p1', userId: 'u1', rating: 5, reviewText: 'দুর্দান্ত!', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
await queue.close();
process.exit(0);
