import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const base = {
  userId: '00000000-0000-4000-8000-000000000001',
  name: 'রহিম উদ্দিন',
  email: 'mdjewel24682468@gmail.com',
  locale: 'bn',
};

const events = [
  { type: 'order.order.cancelled', payload: { ...base, orderId: 'ORD-C-001', reason: 'গ্রাহক অনুরোধ' } },
  { type: 'order.order.packed', payload: { ...base, orderId: 'ORD-P-002' } },
  { type: 'order.order.processing_started', payload: { ...base, orderId: 'ORD-PR-003' } },
  { type: 'order.order.refunded', payload: { ...base, orderId: 'ORD-R-004', amount: 2500, currency: 'BDT' } },
  { type: 'order.order-return.approved', payload: { ...base, orderId: 'ORD-RA-005' } },
  { type: 'order.order-return.requested', payload: { ...base, orderId: 'ORD-RR-006', returnId: 'RET-006' } },
  { type: 'order.order.returned', payload: { ...base, orderId: 'ORD-RT-007', reason: 'ড্যামেজ' } },
  { type: 'order.order.status_changed', payload: { ...base, orderId: 'ORD-SC-008', fromStatus: 'pending', toStatus: 'processing' } },
  { type: 'order.order-return.closed', payload: { ...base, orderId: 'ORD-RC-009', returnId: 'RET-009' } },
  { type: 'order.order-return.received', payload: { ...base, orderId: 'ORD-RR-010' } },
];

for (const evt of events) {
  const id = `final-${Date.now()}-${Math.random()}`;
  await queue.add(evt.type, {
    id, type: evt.type, aggregateId: 'agg-' + id, aggregateType: 'Order',
    payload: evt.payload, occurredAt: new Date().toISOString(), version: 1
  }, { jobId: `${id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

await queue.close();
console.log('\n📧 Check Gmail: mdjewel24682468@gmail.com');
process.exit(0);
