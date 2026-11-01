import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };

async function publish(queueName, event) {
  const queue = new Queue(queueName, { connection });
  await queue.add(event.type, event, { jobId: `${event.id}__${queueName}` });
  await queue.close();
}

const ORDER_ID = 'ORD-E2E2-' + Date.now();
const USER = '00000000-0000-4000-8000-000000000001';

// Payment completed → notification service
await publish('domain-events-notification', {
  id: `evt-pay-completed-${Date.now()}`,
  type: 'payment.payment.completed',
  aggregateId: 'PAY-E2E2-1',
  aggregateType: 'Payment',
  payload: {
    paymentId: 'PAY-E2E2-1',
    orderId: ORDER_ID,
    userId: USER,
    amount: 2500,
    currency: 'BDT',
    name: 'Jewel Ahmed',
    email: 'mdjewel24682468@gmail.com',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ payment.payment.completed → notification service`);
console.log(`📧 Email: mdjewel24682468@gmail.com`);
console.log(`💰 Amount: ৳2,500`);
console.log('');
console.log('⏳ Wait 8s for SMTP send...');

await new Promise(r => setTimeout(r, 8000));
process.exit(0);
