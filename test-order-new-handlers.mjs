import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-order', { connection });

const events = [
  {
    id: `user-sus-${Date.now()}`,
    type: 'identity.user.status_changed',
    aggregateId: 'user-001',
    aggregateType: 'User',
    payload: {
      userId: 'test-user-suspend',
      fromStatus: 'active',
      toStatus: 'suspended',
      reason: 'Policy violation',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `vendor-sus-${Date.now()}`,
    type: 'vendor.vendor.suspended',
    aggregateId: 'vendor-001',
    aggregateType: 'Vendor',
    payload: {
      vendorId: 'test-vendor-suspended',
      reason: 'Suspended for review',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `vendor-appr-${Date.now()}`,
    type: 'vendor.approval.approved',
    aggregateId: 'vendor-002',
    aggregateType: 'Vendor',
    payload: {
      vendorId: 'test-vendor-approved',
      approvedBy: 'admin',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-order` });
  console.log(`✅ ${evt.type}`);
}
await queue.close();
process.exit(0);
