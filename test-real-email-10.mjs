import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const YOUR_EMAIL = 'mdjewel24682468@gmail.com';
const YOUR_NAME = 'Jewel Ahmed';
const YOUR_USER_ID = '00000000-0000-4000-8000-000000000001';

const events = [
  // Delivery (4) — Customer gets these
  {
    id: `ds-real-${Date.now()}`,
    type: 'order.delivery.scheduled',
    aggregateId: 'del-real-1',
    aggregateType: 'Delivery',
    payload: { orderId: 'ORD-REAL-001', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, estimatedAt: '2026-10-30 (বিকাল ৩টা)', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `dit-real-${Date.now()}`,
    type: 'order.delivery.in_transit',
    aggregateId: 'del-real-1',
    aggregateType: 'Delivery',
    payload: { orderId: 'ORD-REAL-001', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, trackingNumber: 'TN-2026-REAL-XYZ', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `dofd-real-${Date.now()}`,
    type: 'order.delivery.out_for_delivery',
    aggregateId: 'del-real-1',
    aggregateType: 'Delivery',
    payload: { orderId: 'ORD-REAL-001', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `df-real-${Date.now()}`,
    type: 'order.delivery.failed',
    aggregateId: 'del-real-2',
    aggregateType: 'Delivery',
    payload: { orderId: 'ORD-REAL-002', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, reason: 'গ্রাহক বাসায় ছিলেন না', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  // Cancel (4)
  {
    id: `ocr-real-${Date.now()}`,
    type: 'order.order-cancel.requested',
    aggregateId: 'ord-real-3',
    aggregateType: 'Order',
    payload: { orderId: 'ORD-REAL-003', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, reason: 'ভুল পণ্য অর্ডার করেছি', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `oca-real-${Date.now()}`,
    type: 'order.order-cancel.approved',
    aggregateId: 'ord-real-3',
    aggregateType: 'Order',
    payload: { orderId: 'ORD-REAL-003', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `ocrj-real-${Date.now()}`,
    type: 'order.order-cancel.rejected',
    aggregateId: 'ord-real-4',
    aggregateType: 'Order',
    payload: { orderId: 'ORD-REAL-004', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, reason: 'পণ্য ইতিমধ্যে পাঠানো হয়েছে', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `ocref-real-${Date.now()}`,
    type: 'order.order-cancel.refunded',
    aggregateId: 'ord-real-3',
    aggregateType: 'Order',
    payload: { orderId: 'ORD-REAL-003', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, amount: 3000, currency: 'BDT', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  // Item (2) — Vendor gets these
  {
    id: `oia-real-${Date.now()}`,
    type: 'order.order-item.added',
    aggregateId: 'ord-real-5',
    aggregateType: 'Order',
    payload: { orderId: 'ORD-REAL-005', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, productName: 'স্মার্টফোন', quantity: 2, locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
  {
    id: `oir-real-${Date.now()}`,
    type: 'order.order-item.removed',
    aggregateId: 'ord-real-5',
    aggregateType: 'Order',
    payload: { orderId: 'ORD-REAL-005', userId: YOUR_USER_ID, email: YOUR_EMAIL, name: YOUR_NAME, productName: 'চার্জার', locale: 'bn' },
    occurredAt: new Date().toISOString(), version: 1,
  },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

console.log('');
console.log('⏳ Wait 15s for SMTP delivery...');
console.log(`📧 Check: ${YOUR_EMAIL}`);
await queue.close();
process.exit(0);
