import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: 'real-user-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-real-user',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-' + Date.now(),
    orderNumber: 'ORD-2026-REAL-USER-' + Date.now(),
    customerId: '8d3493ef-5aeb-4aca-9395-93f9db1265fe',
    totalAmount: 25750,
    currency: 'BDT',
    itemCount: 5,
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Event for:', 'mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
