import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { type: 'payment.payment.paid', id: 'pay-' + Date.now(),
    payload: { paymentId: 'PAY-TEST', orderId: 'ORD-EMAIL-TEST', userId: 'mdjewel24682468@gmail.com', amount: 5000, currency: 'BDT', name: 'Jewel Ahmed', locale: 'bn' } },
  { type: 'order.order.confirmed', id: 'conf-' + Date.now(),
    payload: { orderId: 'ORD-EMAIL-TEST', userId: 'mdjewel24682468@gmail.com', name: 'Jewel Ahmed', locale: 'bn' } },
  { type: 'identity.user.suspended', id: 'susp-' + Date.now(),
    payload: { userId: 'mdjewel24682468@gmail.com', reason: 'Test', name: 'Jewel Ahmed', locale: 'bn' } },
];

for (const [i, evt] of events.entries()) {
  await queue.add(evt.type, {
    id: evt.id,
    type: evt.type,
    aggregateId: `test-${i}`,
    aggregateType: 'Test',
    payload: evt.payload,
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

await queue.close();
process.exit(0);
