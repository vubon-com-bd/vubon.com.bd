import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  {
    id: `prod-low-${Date.now()}`,
    type: 'product.inventory.low_stock_alert',
    aggregateId: 'prod-1',
    aggregateType: 'Product',
    payload: {
      productId: 'PROD-TEST-001',
      available: 3,
      threshold: 10,
      name: 'Jewel Ahmed (Vendor)',
      email: 'mdjewel24682468@gmail.com',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `prod-out-${Date.now()}`,
    type: 'product.inventory.out_of_stock',
    aggregateId: 'prod-2',
    aggregateType: 'Product',
    payload: {
      productId: 'PROD-TEST-002',
      name: 'Jewel Ahmed (Vendor)',
      email: 'mdjewel24682468@gmail.com',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `prod-review-${Date.now()}`,
    type: 'product.review.submitted',
    aggregateId: 'prod-3',
    aggregateType: 'Product',
    payload: {
      reviewId: 'REV-TEST-001',
      productId: 'PROD-TEST-003',
      userId: 'user-001',
      rating: 5,
      reviewText: 'দুর্দান্ত পণ্য!',
      name: 'Jewel Ahmed (Vendor)',
      email: 'mdjewel24682468@gmail.com',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

console.log('');
console.log('⏳ Wait 15s for handler + SMTP send...');
console.log('📧 Check: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
