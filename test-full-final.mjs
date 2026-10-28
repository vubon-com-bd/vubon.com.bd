import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: 'full-final-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-full-final',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-FULL-' + Date.now(),
    orderNumber: 'ORD-2026-FULL-' + Date.now(),
    customerId: 'bd56d020-491d-4268-8bd1-99658f461cd4',
    totalAmount: 15750,
    currency: 'BDT',
    itemCount: 3,
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Event enqueued');
console.log('Customer:', 'bd56d020-491d-4268-8bd1-99658f461cd4');
console.log('Expected email:', 'jewel-final-1793192384@gmail.com');
await queue.close();
process.exit(0);
