import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `pay-fail-test-${Date.now()}`,
  type: 'payment.payment.failed',
  aggregateId: 'pay-001',
  aggregateType: 'Payment',
  payload: {
    paymentId: 'pay-001',
    orderId: 'ORD-001',
    userId: '00000000-0000-4000-8000-000000000001',
    amount: 2500,
    currency: 'BDT',
    reason: 'Insufficient funds',
    name: 'রহিম উদ্দিন',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Payment failed event enqueued');
await queue.close();
process.exit(0);
