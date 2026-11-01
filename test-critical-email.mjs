import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const base = {
  userId: '00000000-0000-4000-8000-000000000001',
  email: 'mdjewel24682468@gmail.com',
  name: 'রহিম উদ্দিন',
  locale: 'bn',
};

const events = [
  { type: 'cart.coupon.applied', payload: { ...base, code: 'SAVE20', discount: 500 } },
  { type: 'cart.coupon.rejected', payload: { ...base, code: 'EXPIRED20', reason: 'মেয়াদ শেষ' } },
  { type: 'cart.voucher.applied', payload: { ...base, code: 'VOUCHER500' } },
  { type: 'cart.voucher.redeemed', payload: { ...base, code: 'VOUCHER500' } },
  { type: 'cart.voucher.rejected', payload: { ...base, code: 'BADVOUCHER', reason: 'অবৈধ কোড' } },
  { type: 'cart.cart_merger.failed', payload: { ...base, reason: 'Network timeout' } },
  { type: 'cart.cart.status_changed', payload: { ...base, fromStatus: 'active', toStatus: 'converted' } },
];

for (const evt of events) {
  const id = `crit-${evt.type.replace(/\./g, '-')}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  await queue.add(evt.type, {
    id,
    type: evt.type,
    aggregateId: 'cart-' + Math.random(),
    aggregateType: 'Cart',
    payload: evt.payload,
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `${id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

await queue.close();
process.exit(0);
