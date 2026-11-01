import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `pv-${Date.now()}`, type: 'identity.user.phone_verified', payload: { userId: 'u-test', name: 'রহিম', email: 'r@test.bd', phone: '+8801712345678', locale: 'bn' } },
  { id: `aa-${Date.now()}`, type: 'identity.user.address_added', payload: { userId: 'u-test', name: 'রহিম', email: 'r@test.bd', addressLabel: 'বাসা', locale: 'bn' } },
  { id: `ca-${Date.now()}`, type: 'identity.user.contact_added', payload: { userId: 'u-test', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: `ops-${Date.now()}`, type: 'order.order.processing_started', payload: { orderId: 'ORD-001', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: `oret-${Date.now()}`, type: 'order.order.returned', payload: { orderId: 'ORD-001', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: `rr-${Date.now()}`, type: 'payment.refund.requested', payload: { orderId: 'ORD-001', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', amount: 2500, locale: 'bn' } },
  { id: `ra-${Date.now()}`, type: 'payment.refund.approved', payload: { orderId: 'ORD-001', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', amount: 2500, locale: 'bn' } },
  { id: `rc-${Date.now()}`, type: 'payment.refund.completed', payload: { orderId: 'ORD-001', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', amount: 2500, locale: 'bn' } },
  { id: `se-${Date.now()}`, type: 'payment.subscription.expired', payload: { userId: 'u-test', name: 'রহিম', email: 'r@test.bd', locale: 'bn' } },
  { id: `vrj-${Date.now()}`, type: 'vendor.approval.rejected', payload: { vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', reason: 'Policy violation', locale: 'bn' } },
  { id: `vri-${Date.now()}`, type: 'vendor.vendor.reinstated', payload: { vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', locale: 'bn' } },
  { id: `pd-${Date.now()}`, type: 'product.product.deleted', payload: { productId: 'p1', vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', productName: 'সুন্দর শাড়ি', locale: 'bn' } },
  { id: `pc-${Date.now()}`, type: 'product.pricing.changed', payload: { productId: 'p1', vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', productName: 'সুন্দর শাড়ি', oldPrice: 500, newPrice: 450, locale: 'bn' } },
];

for (const e of events) {
  await queue.add(e.type, { ...e, aggregateId: 'agg-1', aggregateType: 'Test', occurredAt: new Date().toISOString(), version: 1 }, { jobId: `${e.id}__domain-events-notification` });
  console.log(`✅ ${e.type}`);
}
await queue.close();
process.exit(0);
