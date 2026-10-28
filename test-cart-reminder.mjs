import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `cart-test-${Date.now()}`,
  type: 'cart.cart.abandoned',
  aggregateId: 'cart-001',
  aggregateType: 'Cart',
  payload: {
    cartId: 'cart-001',
    userId: '00000000-0000-4000-8000-000000000001',
    itemCount: 3,
    abandonedAt: new Date().toISOString(),
    name: 'রহিম উদ্দিন',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Cart abandoned event enqueued');
await queue.close();
process.exit(0);
