import { Queue } from 'bullmq';

const connection = { host: '127.0.0.1', port: 6379 };

async function testEvent(queueName, eventPayload) {
  const queue = new Queue(queueName, { connection });
  const job = await queue.add(eventPayload.type, eventPayload, {
    jobId: `${eventPayload.id}__${queueName}`,
  });
  await queue.close();
  return job.id;
}

const tests = [
  {
    name: 'Order Created (Bangla)',
    event: {
      id: `test-bn-order-${Date.now()}`,
      type: 'order.order.created',
      aggregateId: 'order-bn-test',
      aggregateType: 'Order',
      payload: { orderId: 'ORD-BN-' + Date.now(), userId: 'user-bn-1', total: 2500, currency: 'BDT', name: 'করিম সাহেব', locale: 'bn' },
      occurredAt: new Date().toISOString(),
      version: 1,
    },
  },
  {
    name: 'Payment Paid (Bangla)',
    event: {
      id: `test-bn-payment-${Date.now()}`,
      type: 'payment.payment.paid',
      aggregateId: 'payment-bn-test',
      aggregateType: 'Payment',
      payload: { paymentId: 'pay-bn-1', orderId: 'order-bn-1', userId: 'user-bn-1', amount: 1500, currency: 'BDT', name: 'ফাতেমা বেগম', locale: 'bn' },
      occurredAt: new Date().toISOString(),
      version: 1,
    },
  },
  {
    name: 'User Created (Bangla)',
    event: {
      id: `test-bn-user-${Date.now()}`,
      type: 'user.created',
      aggregateId: 'user-bn-test',
      aggregateType: 'User',
      payload: { userId: 'user-bn-2', email: 'test@vubon.bd', name: 'আহমেদ আলী', locale: 'bn' },
      occurredAt: new Date().toISOString(),
      version: 1,
    },
  },
];

for (const t of tests) {
  const jobId = await testEvent('domain-events-notification', t.event);
  console.log(`✅ ${t.name}: ${jobId}`);
}
process.exit(0);
