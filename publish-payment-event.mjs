/**
 * Test publisher — fan-out to all consumer queues (mirrors EventBusService.publish)
 */
import { Queue } from 'bullmq';
import { randomUUID } from 'node:crypto';

const CONNECTION = { host: 'localhost', port: 6379 };
const CONSUMERS = [
  'logistics', 'notification', 'order', 'analytics', 'support',
  'marketing', 'cart', 'search', 'discovery', 'ai', 'reporting',
];

const eventId = randomUUID();
const paymentId = randomUUID();
const orderId = randomUUID();
const userId = randomUUID();

const event = {
  id: eventId,
  type: 'payment.captured',
  aggregateId: paymentId,
  aggregateType: 'Payment',
  payload: {
    paymentId,
    orderId,
    userId,             // ⭐ ADD — notification needs this
    amount: 1500,
    currency: 'BDT',
  },
  occurredAt: Date.now(),
  version: 1,
};

for (const c of CONSUMERS) {
  const queueName = `domain-events-${c}`;
  const q = new Queue(queueName, { connection: CONNECTION });
  await q.add(event.type, event, { jobId: `${eventId}__${queueName}` });
  await q.close();
  console.log(`✅ enqueued → ${queueName}`);
}

console.log('');
console.log('eventId =', eventId);
console.log('paymentId =', paymentId);
console.log('orderId =', orderId);
console.log('userId =', userId);
process.exit(0);
