import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  // Delivery
  { id: `dpu-${Date.now()}`, type: 'order.delivery.picked_up', aggregateId: 'del-2', aggregateType: 'Delivery', payload: { orderId: 'ORD-FINAL-01', userId: 'u1', name: 'রহিম উদ্দিন', trackingNumber: 'TN-FINAL-01', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `drs-${Date.now()}`, type: 'order.delivery.rescheduled', aggregateId: 'del-2', aggregateType: 'Delivery', payload: { orderId: 'ORD-FINAL-01', userId: 'u1', name: 'রহিম উদ্দিন', newEstimatedAt: '2026-11-05', reason: 'আবহাওয়া খারাপ', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  // Order
  { id: `ona-${Date.now()}`, type: 'order.order.note_added', aggregateId: 'ord-2', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-02', userId: 'u1', name: 'করিম সাহেব', note: 'বিকেল ৫টার পরে ডেলিভারি দিন', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `opc-${Date.now()}`, type: 'order.order.priority_changed', aggregateId: 'ord-2', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-02', userId: 'u1', name: 'করিম সাহেব', fromPriority: 'normal', toPriority: 'high', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  // Fulfillment
  { id: `ofs-${Date.now()}`, type: 'order.order-fulfillment.started', aggregateId: 'ord-2', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-02', userId: 'u1', name: 'করিম সাহেব', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `off-${Date.now()}`, type: 'order.order-fulfillment.fulfilled', aggregateId: 'ord-2', aggregateType: 'Order', payload: { orderId: 'ORD-FINAL-02', userId: 'u1', name: 'করিম সাহেব', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log('⏳ Wait 5s for handlers to fire...');
await queue.close();
process.exit(0);
