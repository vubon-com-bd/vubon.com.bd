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
  { type: 'cart.coupon.applied', payload: { ...base, code: 'SAVE20', discount: 500 } },
  { type: 'cart.coupon.rejected', payload: { ...base, code: 'EXPIRED20', reason: 'মেয়াদ শেষ' } },
  { type: 'cart.coupon.removed', payload: { ...base, code: 'SAVE20' } },
  { type: 'cart.voucher.applied', payload: { ...base, code: 'VOUCHER500' } },
  { type: 'cart.voucher.redeemed', payload: { ...base, code: 'VOUCHER500' } },
  { type: 'cart.voucher.rejected', payload: { ...base, code: 'BADVOUCHER', reason: 'অবৈধ কোড' } },
  { type: 'cart.voucher.removed', payload: { ...base, code: 'VOUCHER500' } },
  { type: 'cart.cart.status_changed', payload: { ...base, fromStatus: 'active', toStatus: 'converted' } },
  { type: 'cart.cart_merger.failed', payload: { ...base, reason: 'Network error' } },
  { type: 'cart.cart_item.added', payload: { ...base, productName: 'স্মার্ট ফোন' } },
  { type: 'cart.cart_item.removed', payload: { ...base, productName: 'স্মার্ট ফোন' } },
  { type: 'cart.cart_item.quantity_changed', payload: { ...base, productName: 'শার্ট', oldQuantity: 1, newQuantity: 3 } },
  { type: 'cart.saved_for_later.saved', payload: { ...base, productName: 'জুতা' } },
  { type: 'cart.saved_for_later.moved_to_cart', payload: { ...base, productName: 'জুতা' } },
  { type: 'cart.guest_cart.created', payload: { ...base } },
  { type: 'cart.guest_cart.merged', payload: { ...base, itemCount: 3 } },
  { type: 'cart.cart_tax.recalculated', payload: { ...base, taxAmount: 150 } },
];

for (const evt of events) {
  const id = `test-${evt.type.replace(/\./g, '-')}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  await queue.add(evt.type, {
    id,
    type: evt.type,
    aggregateId: 'cart-agg-' + Math.random(),
    aggregateType: 'Cart',
    payload: evt.payload,
    occurredAt: new Date().toISOString(),
    version: 1,
  }, { jobId: `${id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

await queue.close();
process.exit(0);
