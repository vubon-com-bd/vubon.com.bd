import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `acd-${Date.now()}`, type: 'cart.abandoned_cart.detected', aggregateId: 'ac-1', aggregateType: 'AbandonedCart', payload: { abandonedCartId: 'ac-1', cartId: 'cart-1', itemCount: 3, cartValue: 2500, userId: 'u1', name: 'রহিম', email: 'mdjewel24682468@gmail.com', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `acr-${Date.now()}`, type: 'cart.abandoned_cart.reminder_sent', aggregateId: 'ac-1', aggregateType: 'AbandonedCart', payload: { abandonedCartId: 'ac-1', channel: 'email', sentAt: new Date().toISOString(), remindersSent: 1, userId: 'u1', cartId: 'cart-1', name: 'রহিম', email: 'mdjewel24682468@gmail.com', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `acl-${Date.now()}`, type: 'cart.abandoned_cart.lost', aggregateId: 'ac-1', aggregateType: 'AbandonedCart', payload: { abandonedCartId: 'ac-1', cartId: 'cart-1', itemCount: 3, userId: 'u1', name: 'রহিম', email: 'mdjewel24682468@gmail.com', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ce-${Date.now()}`, type: 'cart.cart.expired', aggregateId: 'cart-1', aggregateType: 'Cart', payload: { cartId: 'cart-1', expiredAt: new Date().toISOString(), itemCount: 2, userId: 'u1', name: 'রহিম', email: 'mdjewel24682468@gmail.com', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `cmc-${Date.now()}`, type: 'cart.cart_merger.completed', aggregateId: 'cm-1', aggregateType: 'CartMerger', payload: { mergerId: 'cm-1', sourceCartId: 'cart-old', targetCartId: 'cart-1', userId: 'u1', name: 'রহিম', email: 'mdjewel24682468@gmail.com', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('\n⏳ Wait 10s for processing + SMTP send...');
console.log('📧 Check: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
