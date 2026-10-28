import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });
await queue.add('order.order.created', {
  id: 'debug-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-debug',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-DEBUG-' + Date.now(),
    orderNumber: 'ORD-DEBUG',
    customerId: '8d3493ef-5aeb-4aca-9395-93f9db1265fe',
    totalAmount: 5000,
    currency: 'BDT',
    itemCount: 1,
  },
  occurredAt: new Date().toISOString(),
  version: 1,
}, { jobId: 'debug-' + Date.now() + '__domain-events-notification' });
console.log('Debug event enqueued');
await queue.close();
process.exit(0);
