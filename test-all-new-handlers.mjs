import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  // Checkout (3)
  { type: 'order.checkout.completed', payload: { orderId: 'ORD-CHK-001', userId: 'u1', total: 4500, currency: 'BDT', name: 'রহিম', locale: 'bn' } },
  { type: 'order.checkout.abandoned', payload: { userId: 'u1', name: 'রহিম', locale: 'bn' } },
  { type: 'order.checkout.expired', payload: { userId: 'u1', name: 'রহিম', locale: 'bn' } },
  // Delivery (2)
  { type: 'order.delivery.delivered', payload: { orderId: 'ORD-DLV-002', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  { type: 'order.delivery.cancelled', payload: { orderId: 'ORD-DLV-003', userId: 'u1', reason: 'ঠিকানা ভুল', name: 'রহিম', locale: 'bn' } },
  // Order (2)
  { type: 'order.order.completed', payload: { orderId: 'ORD-CMP-004', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  { type: 'order.order.out_for_delivery', payload: { orderId: 'ORD-OFD-005', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  // Cancel (1)
  { type: 'order.order-cancel.processed', payload: { orderId: 'ORD-CNL-006', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  // Return (5)
  { type: 'order.order-return.pickup_scheduled', payload: { orderId: 'ORD-RET-007', userId: 'u1', returnId: 'RET-001', name: 'রহিম', locale: 'bn' } },
  { type: 'order.order-return.picked_up', payload: { orderId: 'ORD-RET-008', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  { type: 'order.order-return.refunded', payload: { orderId: 'ORD-RET-009', userId: 'u1', amount: 2500, currency: 'BDT', name: 'রহিম', locale: 'bn' } },
  { type: 'order.order-return.replaced', payload: { orderId: 'ORD-RET-010', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  { type: 'order.order-return.inspected', payload: { orderId: 'ORD-RET-011', userId: 'u1', name: 'রহিম', locale: 'bn' } },
  // Tracking (1)
  { type: 'order.order-tracking.updated', payload: { orderId: 'ORD-TRK-012', userId: 'u1', trackingNumber: 'TN-XYZ', location: 'ঢাকা হাব', name: 'রহিম', locale: 'bn' } },
  // Order Item (3)
  { type: 'order.order-item.updated', payload: { orderId: 'ORD-ITM-013', userId: 'u1', productName: 'স্মার্টফোন', name: 'রহিম', locale: 'bn' } },
  { type: 'order.order-item.quantity_changed', payload: { orderId: 'ORD-ITM-014', userId: 'u1', productName: 'চার্জার', oldQuantity: 1, newQuantity: 2, name: 'রহিম', locale: 'bn' } },
  { type: 'order.order-item.status_changed', payload: { orderId: 'ORD-ITM-015', userId: 'u1', status: 'packed', name: 'রহিম', locale: 'bn' } },
];

for (const evt of events) {
  const id = `${evt.type}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
  await queue.add(evt.type, {
    id,
    type: evt.type,
    aggregateId: id,
    aggregateType: 'Test',
    payload: evt.payload,
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `${id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
console.log('');
console.log('⏳ Wait 6s for handlers to fire...');
await queue.close();
process.exit(0);
