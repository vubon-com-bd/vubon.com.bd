import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

// ⚠️ আপনার আসল Gmail দিন এখানে
const MY_GMAIL = 'mdjewel24682468@gmail.com';

const events = [
  {
    id: `test-gmail-${Date.now()}`,
    type: 'order.delivery.scheduled',
    aggregateId: 'del-gmail-1',
    aggregateType: 'Delivery',
    payload: {
      orderId: 'ORD-GMAIL-001',
      userId: '81fec371-50c5-4aec-9e04-f81acdef36a4',
      name: 'Jewel Ahmed',
      email: MY_GMAIL,
      estimatedAt: '2026-11-05',
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
console.log(`📧 Sending to: ${MY_GMAIL}`);
console.log('⏳ Check INBOX + SPAM in 15 seconds');
await queue.close();
process.exit(0);
