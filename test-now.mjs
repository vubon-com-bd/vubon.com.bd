import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });
await queue.add('order.order.created', {
  id: 'test-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-test',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-TEST-' + Date.now(),
    orderNumber: 'ORD-2026-TEST-NOW',
    customerId: '8d3493ef-5aeb-4aca-9395-93f9db1265fe',
    totalAmount: 25000,
    currency: 'BDT',
    itemCount: 2,
  },
  occurredAt: new Date().toISOString(),
  version: 1,
}, { jobId: 'test-' + Date.now() + '__domain-events-notification' });
console.log('Event enqueued for:', 'mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
