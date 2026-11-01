import { Queue } from 'bullmq';
import { randomUUID } from 'node:crypto';

const q = new Queue('domain-events', {
  connection: { host: 'localhost', port: 6379 },
});

const eventId = randomUUID();
const orderId = randomUUID();
const userId = randomUUID();

await q.add('order.confirmed', {
  id: eventId,
  type: 'order.confirmed',
  aggregateId: orderId,
  aggregateType: 'Order',
  payload: {
    orderId,
    orderNumber: 'ORD-E2E-001',
    customerId: userId,
    total: 1500,
    currency: 'BDT',
  },
  occurredAt: Date.now(),
  version: 1,
});

console.log('✅ Published:');
console.log('   eventId =', eventId);
console.log('   orderId =', orderId);
console.log('   userId  =', userId);
await q.close();
process.exit(0);
