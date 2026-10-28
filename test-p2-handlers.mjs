import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `ic-${Date.now()}`, type: 'payment.invoice.created', aggregateId: 'inv-1', aggregateType: 'Invoice', payload: { invoiceId: 'inv-1', invoiceNumber: 'INV-2026-001', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', total: 5750, currency: 'BDT', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `pp-${Date.now()}`, type: 'vendor.payout.processed', aggregateId: 'pay-1', aggregateType: 'Payout', payload: { payoutId: 'pay-1', vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', amount: 10000, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `pa-${Date.now()}`, type: 'vendor.payout.approved', aggregateId: 'pay-1', aggregateType: 'Payout', payload: { payoutId: 'pay-1', vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', amount: 10000, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `me-${Date.now()}`, type: 'identity.mfa.enabled', aggregateId: 'u-test', aggregateType: 'User', payload: { userId: 'u-test', name: 'রহিম', email: 'r@test.bd', method: 'TOTP', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `pc-${Date.now()}`, type: 'product.product.created', aggregateId: 'p-1', aggregateType: 'Product', payload: { productId: 'p-1', vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', productName: 'সুন্দর শাড়ি', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ppb-${Date.now()}`, type: 'product.product.published', aggregateId: 'p-1', aggregateType: 'Product', payload: { productId: 'p-1', vendorId: 'v1', userId: 'u-test', name: 'করিম', email: 'k@test.bd', productName: 'সুন্দর শাড়ি', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `sr-${Date.now()}`, type: 'payment.subscription.renewed', aggregateId: 'sub-1', aggregateType: 'Subscription', payload: { subscriptionId: 'sub-1', userId: 'u-test', name: 'রহিম', email: 'r@test.bd', nextBillingAt: '2026-11-28', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
await queue.close();
process.exit(0);
