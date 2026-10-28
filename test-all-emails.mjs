import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  {
    id: `pay-fail-${Date.now()}`,
    type: 'payment.payment.failed',
    aggregateId: 'payment-001',
    aggregateType: 'Payment',
    payload: {
      paymentId: 'pay-001', orderId: 'ORD-TEST-001',
      userId: '00000000-0000-4000-8000-000000000001',
      amount: 1500, currency: 'BDT',
      reason: 'Insufficient funds',
      name: 'Jewel Ahmed', email: 'mdjewel24682468@gmail.com',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `order-ship-${Date.now()}`,
    type: 'order.order.shipped',
    aggregateId: 'order-002',
    aggregateType: 'Order',
    payload: {
      orderId: 'ORD-TEST-002',
      userId: '00000000-0000-4000-8000-000000000001',
      trackingNumber: 'TN-2026-TEST',
      name: 'Jewel Ahmed', email: 'mdjewel24682468@gmail.com',
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
console.log('⏳ Wait 10s for SMTP send...');
console.log('📧 Check: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
