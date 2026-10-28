import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };

// Enqueue order.created event → triggers real email
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: 'test-real-email-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-test',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-2026-SMTP-TEST',
    userId: 'mdjewel24682468@gmail.com',
    total: 5750,
    currency: 'BDT',
    name: 'Jewel Ahmed',
    locale: 'bn',
    email: 'mdjewel24682468@gmail.com',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Event enqueued');
console.log('📧 Will send to: mdjewel24682468@gmail.com');
console.log('📧 Subject: অর্ডার কনফার্ম হয়েছে - #ORD-2026-SMTP-TEST');
console.log('');
console.log('⏳ Wait 5-10 seconds for actual SMTP send...');
await queue.close();
process.exit(0);
