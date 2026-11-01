import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };

// Simulate real order.created event (as OrderService would publish)
const notificationQueue = new Queue('domain-events-notification', { connection });

const orderCreatedEvent = {
  id: `realorder-${Date.now()}`,
  type: 'order.order.created',
  aggregateId: `order-${Date.now()}`,
  aggregateType: 'Order',
  payload: {
    orderId: `ORD-LIVE-${Date.now()}`,
    orderNumber: `ORD-2026-${Date.now()}`,
    userId: '00000000-0000-4000-8000-000000000001',
    total: 3500,
    currency: 'BDT',
    name: 'রহিম উদ্দিন',
    email: 'mdjewel24682468@gmail.com',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await notificationQueue.add(orderCreatedEvent.type, orderCreatedEvent, {
  jobId: `${orderCreatedEvent.id}__domain-events-notification`,
});
await notificationQueue.close();
console.log('✅ Real order.order.created event published');
console.log('   Order: ORD-LIVE-' + Date.now());
console.log('   Check email: mdjewel24682468@gmail.com');
console.log('   Check log: ~/notification-service.log');
