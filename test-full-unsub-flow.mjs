import { Queue } from 'bullmq';
import { UnsubscribeService } from './apps/notification-service/dist/module/domain/services/unsubscribe.service.js';

// 1. Unsubscribe
const token = UnsubscribeService.encodeToken({
  userId: 'u-html-1',
  channel: 'email',
  category: 'order',
  expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
});

const res = await fetch('http://localhost:4006/unsubscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token }),
});
console.log('Unsubscribe response:', res.status);

// 2. Wait then test
await new Promise(r => setTimeout(r, 1000));

// 3. Send notification to unsubscribed user
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `post-unsub-${Date.now()}`,
  type: 'order.order.created',
  aggregateId: 'ord-post-unsub',
  aggregateType: 'Order',
  payload: {
    orderId: 'ORD-AFTER-UNSUB-001',
    userId: 'u-html-1',
    total: 2000,
    currency: 'BDT',
    name: 'সালেহা বেগম',
    locale: 'bn',
    email: 'saleha@vubon.bd',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Test event enqueued');
await queue.close();
process.exit(0);
