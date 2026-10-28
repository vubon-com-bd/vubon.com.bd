import { Queue } from 'bullmq';

const connection = { host: '127.0.0.1', port: 6379 };
const orderQueue = new Queue('domain-events-order', { connection });

async function enqueue(event) {
  const job = await orderQueue.add(event.type, event, {
    jobId: `${event.id}__domain-events-order`,
  });
  console.log(`✅ ${event.type} → ${job.id}`);
  return job.id;
}

console.log('═══════════════════════════════════════════════════════════');
console.log('  ORDER SERVICE — INTEGRATION TEST');
console.log('═══════════════════════════════════════════════════════════\n');

const tests = [
  // 1. Identity user.suspended → cancel user's orders
  {
    id: `test-user-sus-${Date.now()}`,
    type: 'identity.user.status_changed',
    aggregateId: 'user-test-1',
    aggregateType: 'User',
    payload: {
      userId: 'e67db705-c22f-4b82-b1e7-b52a4b9a49a2',
      fromStatus: 'active',
      toStatus: 'suspended',
      reason: 'Policy violation',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  // 2. Vendor suspended → check for affected orders
  {
    id: `test-vendor-sus-${Date.now()}`,
    type: 'vendor.vendor.suspended',
    aggregateId: 'vendor-test-1',
    aggregateType: 'Vendor',
    payload: {
      vendorId: 'vendor-abc-123',
      reason: 'Fraud detected',
      suspendedAt: new Date().toISOString(),
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  // 3. Vendor approved → check resume
  {
    id: `test-vendor-appr-${Date.now()}`,
    type: 'vendor.approval.approved',
    aggregateId: 'vendor-test-2',
    aggregateType: 'Vendor',
    payload: {
      vendorId: 'vendor-xyz-456',
      approvedBy: 'admin',
      approvedAt: new Date().toISOString(),
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
];

for (const test of tests) {
  await enqueue(test);
  await new Promise(r => setTimeout(r, 500));
}

await orderQueue.close();
console.log('\n✅ 3 events published — waiting 5s for handlers...');
