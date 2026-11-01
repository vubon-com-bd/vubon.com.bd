import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `oc-${Date.now()}`, type: 'order.order.cancelled', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-001', userId: 'u-test', reason: 'Customer requested', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `orq-${Date.now()}`, type: 'order.order-return.requested', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-001', userId: 'u-test', reason: 'Damaged', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ora-${Date.now()}`, type: 'order.order-return.approved', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-001', userId: 'u-test', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `cco-${Date.now()}`, type: 'cart.cart.checked_out', aggregateId: 'cart-1', aggregateType: 'Cart', payload: { cartId: 'cart-1', userId: 'u-test', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ccv-${Date.now()}`, type: 'cart.cart.converted', aggregateId: 'cart-1', aggregateType: 'Cart', payload: { cartId: 'cart-1', orderId: 'ORD-001', userId: 'u-test', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
await queue.close();
process.exit(0);
