import { Queue } from 'bullmq';

const connection = { host: '127.0.0.1', port: 6379 };
const USER = '00000000-0000-4000-8000-000000000001';
const ORDER_ID = 'ORD-E2E-' + Date.now();
const CART_ID = 'CART-E2E-' + Date.now();

async function publish(queueName, event) {
  const queue = new Queue(queueName, { connection });
  await queue.add(event.type, event, { jobId: `${event.id}__${queueName}` });
  await queue.close();
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: Cart → checked_out (triggers order creation)
// ═══════════════════════════════════════════════════════════════
console.log('\n═══ STEP 1: Cart Checked Out ═══');
await publish('domain-events-order', {
  id: `evt-checkout-${Date.now()}`,
  type: 'cart.cart.checked_out',
  aggregateId: CART_ID,
  aggregateType: 'Cart',
  payload: {
    cartId: CART_ID,
    userId: USER,
    items: [
      { productId: 'PROD-1', variantId: null, name: 'Test Product', sku: 'SKU-001', quantity: 2, unitPrice: 500, totalPrice: 1000 },
    ],
    subtotal: 1000,
    taxAmount: 150,
    shippingAmount: 50,
    total: 1200,
    currency: 'BDT',
    shippingAddressId: 'ADDR-1',
    checkedOutAt: new Date().toISOString(),
  },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ cart.cart.checked_out → order service`);

// Wait for order to be created
await new Promise(r => setTimeout(r, 3000));

// ═══════════════════════════════════════════════════════════════
// STEP 2: Order created event
// ═══════════════════════════════════════════════════════════════
console.log('\n═══ STEP 2: Order Created ═══');
await publish('domain-events-payment', {
  id: `evt-order-${Date.now()}`,
  type: 'order.order.created',
  aggregateId: ORDER_ID,
  aggregateType: 'Order',
  payload: {
    orderId: ORDER_ID,
    orderNumber: ORDER_ID,
    customerId: USER,
    userId: USER,
    totalAmount: 1200,
    total: 1200,
    currency: 'BDT',
    itemCount: 1,
    name: 'Jewel Ahmed',
    email: 'mdjewel24682468@gmail.com',
    locale: 'bn',
    createdAt: new Date().toISOString(),
  },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ order.order.created → payment service (auto invoice + payment initiate)`);

// Wait for payment to initiate
await new Promise(r => setTimeout(r, 3000));

// ═══════════════════════════════════════════════════════════════
// STEP 3: Payment completed
// ═══════════════════════════════════════════════════════════════
console.log('\n═══ STEP 3: Payment Completed ═══');
await publish('domain-events-order', {
  id: `evt-payment-${Date.now()}`,
  type: 'payment.payment.completed',
  aggregateId: 'PAY-E2E-1',
  aggregateType: 'Payment',
  payload: {
    paymentId: 'PAY-E2E-1',
    orderId: ORDER_ID,
    userId: USER,
    amount: 1200,
    currency: 'BDT',
    name: 'Jewel Ahmed',
    email: 'mdjewel24682468@gmail.com',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ payment.payment.completed → order + cart services`);

// Also publish to cart queue (separate consumer)
await publish('domain-events-cart', {
  id: `evt-payment-cart-${Date.now()}`,
  type: 'payment.payment.completed',
  aggregateId: 'PAY-E2E-1',
  aggregateType: 'Payment',
  payload: {
    paymentId: 'PAY-E2E-1',
    orderId: ORDER_ID,
    userId: USER,
    amount: 1200,
    currency: 'BDT',
    name: 'Jewel Ahmed',
    email: 'mdjewel24682468@gmail.com',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ payment.completed → cart service (conversion trigger)`);

// Also publish to notification queue
await publish('domain-events-notification', {
  id: `evt-payment-notif-${Date.now()}`,
  type: 'payment.payment.completed',
  aggregateId: 'PAY-E2E-1',
  aggregateType: 'Payment',
  payload: {
    paymentId: 'PAY-E2E-1',
    orderId: ORDER_ID,
    userId: USER,
    amount: 1200,
    currency: 'BDT',
    name: 'Jewel Ahmed',
    email: 'mdjewel24682468@gmail.com',
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
});
console.log(`✅ payment.completed → notification service`);

console.log('\n⏳ Waiting 5s for all handlers to process...');
await new Promise(r => setTimeout(r, 5000));

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('  E2E FLOW COMPLETE');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`  Order: ${ORDER_ID}`);
console.log(`  User:  ${USER}`);
console.log(`  Email: mdjewel24682468@gmail.com`);
console.log(`\n  📧 Check email for payment receipt`);
console.log('═══════════════════════════════════════════════════════════════');

process.exit(0);
