import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

// Simulate real order.created event — NO email in payload
// Only customerId (like order service actually publishes)
const event = {
  id: 'real-order-' + Date.now(),
  type: 'order.order.created',
  aggregateId: 'order-real-flow',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-REAL-' + Date.now(),
    orderNumber: 'ORD-2026-REAL-001',
    customerId: '81fec371-50c5-4aec-9e04-f81acdef36a4',  // ← customerId only, NO email!
    totalAmount: 8500,
    currency: 'BDT',
    itemCount: 3,
    // ← NO email, NO name, NO locale — like real production
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Event enqueued');
console.log('Customer ID: 81fec371-50c5-4aec-9e04-f81acdef36a4');
console.log('Expected: Handler fetches user via UserClient → sends email');
await queue.close();
process.exit(0);
