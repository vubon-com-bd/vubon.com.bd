import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };

async function testBulk() {
  const queue = new Queue('domain-events-notification', { connection });
  
  // Test 1: Event WITHOUT locale field (should default to 'bn')
  const event1 = {
    id: 'test-default-bn-' + Date.now(),
    type: 'order.order.created',
    aggregateId: 'order-test',
    aggregateType: 'Order',
    payload: {
      orderId: 'ORD-DEFAULT-BN-TEST',
      userId: 'mdjewel24682468@gmail.com',
      total: 3999,
      currency: 'BDT',
      name: 'Jewel Ahmed',
      email: 'mdjewel24682468@gmail.com',
      // NO locale field — should default to bn
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  };
  
  await queue.add(event1.type, event1, { jobId: `${event1.id}__domain-events-notification` });
  console.log('✅ Event WITHOUT locale → should default to Bangla');
  console.log('📧 Order: ' + event1.payload.orderId);
  
  await queue.close();
  process.exit(0);
}

await testBulk();
