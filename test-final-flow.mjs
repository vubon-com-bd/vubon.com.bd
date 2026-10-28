import { Queue } from 'bullmq';

const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const userId = process.env.USER_ID || '';
const userEmail = process.env.USER_EMAIL || '';

const event = {
  id: 'real-e2e-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-e2e',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-E2E-' + Date.now(),
    orderNumber: 'ORD-2026-E2E-' + Date.now(),
    customerId: userId,
    totalAmount: 15999,
    currency: 'BDT',
    itemCount: 4,
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

const jobId = event.id + '__domain-events-notification';
await queue.add(event.type, event, { jobId });
console.log('✅ Event enqueued for:', userEmail);
console.log('Customer ID:', userId);
await queue.close();
process.exit(0);
