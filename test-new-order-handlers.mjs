import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  // Delivery (4)
  { id: `ds-${Date.now()}`, type: 'order.delivery.scheduled', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-TEST-100', userId: 'u1', name: 'রহিম উদ্দিন', estimatedAt: '2026-10-30', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `dit-${Date.now()}`, type: 'order.delivery.in_transit', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-TEST-100', userId: 'u1', name: 'রহিম উদ্দিন', trackingNumber: 'TN-2026-XYZ', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `dofd-${Date.now()}`, type: 'order.delivery.out_for_delivery', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-TEST-100', userId: 'u1', name: 'রহিম উদ্দিন', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `df-${Date.now()}`, type: 'order.delivery.failed', aggregateId: 'del-1', aggregateType: 'Delivery', payload: { orderId: 'ORD-TEST-100', userId: 'u1', name: 'রহিম উদ্দিন', reason: 'গ্রাহক বাসায় ছিলেন না', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  // Cancel (4)
  { id: `ocr-${Date.now()}`, type: 'order.order-cancel.requested', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-TEST-101', userId: 'u1', name: 'করিম সাহেব', reason: 'ভুল পণ্য', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `oca-${Date.now()}`, type: 'order.order-cancel.approved', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-TEST-101', userId: 'u1', name: 'করিম সাহেব', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ocrj-${Date.now()}`, type: 'order.order-cancel.rejected', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-TEST-101', userId: 'u1', name: 'করিম সাহেব', reason: 'পণ্য পাঠানো হয়েছে', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `ocref-${Date.now()}`, type: 'order.order-cancel.refunded', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-TEST-101', userId: 'u1', name: 'করিম সাহেব', amount: 3000, currency: 'BDT', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  // Item (2)
  { id: `oia-${Date.now()}`, type: 'order.order-item.added', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-TEST-101', userId: 'u1', name: 'করিম সাহেব', productName: 'স্মার্টফোন', quantity: 2, locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `oir-${Date.now()}`, type: 'order.order-item.removed', aggregateId: 'ord-1', aggregateType: 'Order', payload: { orderId: 'ORD-TEST-101', userId: 'u1', name: 'করিম সাহেব', productName: 'চার্জার', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log('⏳ Wait 6s for handlers to fire...');
await queue.close();
process.exit(0);
