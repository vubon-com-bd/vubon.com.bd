import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  'identity.user.created', 'identity.user.email_verified', 'identity.user.suspended',
  'identity.user.status_changed', 'identity.user.role_assigned', 'identity.user.role_revoked',
  'product.inventory.low_stock_alert', 'product.inventory.out_of_stock', 'product.review.submitted',
  'order.order.created', 'order.order.confirmed', 'order.order.shipped', 'order.order.delivered',
  'payment.payment.paid', 'payment.payment.failed', 'payment.payment.refunded',
  'cart.cart.abandoned',
  'vendor.vendor.registered', 'vendor.approval.approved', 'vendor.vendor.suspended',
];

for (const [i, type] of events.entries()) {
  await queue.add(type, {
    id: `test-all-${Date.now()}-${i}`,
    type,
    aggregateId: `test-${i}`,
    aggregateType: 'Test',
    payload: { userId: 'mdjewel24682468@gmail.com', email: 'mdjewel24682468@gmail.com', name: 'Jewel', locale: 'bn' },
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `test-all-${Date.now()}-${i}__domain-events-notification` });
  console.log(`✅ ${i+1}/20: ${type}`);
}

await queue.close();
process.exit(0);
