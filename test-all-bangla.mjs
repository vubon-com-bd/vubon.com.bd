import { Queue } from 'bullmq';

const connection = { host: '127.0.0.1', port: 6379 };

async function enqueue(type, payload, id) {
  const queue = new Queue('domain-events-notification', { connection });
  const job = await queue.add(type, {
    id,
    type,
    aggregateId: `${type}-agg`,
    aggregateType: 'Test',
    payload: { ...payload, locale: 'bn' },
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `${id}__domain-events-notification` });
  await queue.close();
  return job.id;
}

const tests = [
  { type: 'order.order.created', payload: { orderId: 'ORD-001', userId: 'u1', total: 2500, currency: 'BDT', name: 'রহিম' }, label: 'Order Created' },
  { type: 'order.order.confirmed', payload: { orderId: 'ORD-001', userId: 'u1', name: 'রহিম' }, label: 'Order Confirmed' },
  { type: 'order.order.shipped', payload: { orderId: 'ORD-001', userId: 'u1', trackingNumber: 'TN123', name: 'রহিম' }, label: 'Order Shipped' },
  { type: 'order.order.delivered', payload: { orderId: 'ORD-001', userId: 'u1', name: 'রহিম' }, label: 'Order Delivered' },
  { type: 'payment.payment.paid', payload: { paymentId: 'pay1', orderId: 'ORD-001', userId: 'u1', amount: 2500, currency: 'BDT', name: 'রহিম' }, label: 'Payment Paid' },
  { type: 'payment.payment.failed', payload: { paymentId: 'pay1', orderId: 'ORD-001', userId: 'u1', amount: 2500, currency: 'BDT', reason: 'Network', name: 'রহিম' }, label: 'Payment Failed' },
  { type: 'identity.user.created', payload: { userId: 'u1', email: 'r@v.bd', name: 'রহিম' }, label: 'User Created' },
  { type: 'identity.user.suspended', payload: { userId: 'u1', reason: 'Policy', name: 'রহিম' }, label: 'User Suspended' },
  { type: 'vendor.vendor.registered', payload: { vendorId: 'v1', userId: 'u1', businessName: 'রহিমের দোকান', name: 'রহিম' }, label: 'Vendor Registered' },
  { type: 'vendor.approval.approved', payload: { vendorId: 'v1', userId: 'u1', name: 'রহিম' }, label: 'Vendor Approved' },
  { type: 'cart.cart.abandoned', payload: { cartId: 'c1', userId: 'u1', itemCount: 3, abandonedAt: new Date().toISOString(), name: 'রহিম' }, label: 'Cart Abandoned' },
  { type: 'product.review.submitted', payload: { reviewId: 'r1', productId: 'p1', userId: 'u1', rating: 5, name: 'রহিম' }, label: 'Review Posted' },
];

let count = 0;
for (const t of tests) {
  const jobId = await enqueue(t.type, t.payload, `test-${Date.now()}-${count++}`);
  console.log(`✅ ${t.label}: ${jobId}`);
}
process.exit(0);
