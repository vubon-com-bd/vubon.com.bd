import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

// Test all identity events that notification should handle
const events = [
  {
    id: `id-user-created-${Date.now()}`,
    type: 'identity.user.created',
    aggregateId: 'user-test-1',
    aggregateType: 'User',
    payload: {
      userId: 'user-test-1',
      email: 'mdjewel24682468@gmail.com',
      name: 'Jewel Ahmed',
      locale: 'bn',
      createdAt: new Date().toISOString(),
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `id-user-verified-${Date.now()}`,
    type: 'identity.user.email_verified',
    aggregateId: 'user-test-1',
    aggregateType: 'User',
    payload: {
      userId: 'user-test-1',
      email: 'mdjewel24682468@gmail.com',
      name: 'Jewel Ahmed',
      verifiedAt: new Date().toISOString(),
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `id-user-suspended-${Date.now()}`,
    type: 'identity.user.suspended',
    aggregateId: 'user-test-1',
    aggregateType: 'User',
    payload: {
      userId: 'user-test-1',
      email: 'mdjewel24682468@gmail.com',
      name: 'Jewel Ahmed',
      reason: 'Policy violation',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
  {
    id: `id-user-role-${Date.now()}`,
    type: 'identity.user.role_assigned',
    aggregateId: 'user-test-1',
    aggregateType: 'User',
    payload: {
      userId: 'user-test-1',
      email: 'mdjewel24682468@gmail.com',
      name: 'Jewel Ahmed',
      role: 'Premium Customer',
      locale: 'bn',
    },
    occurredAt: new Date().toISOString(),
    version: 1,
  },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}

console.log('');
console.log('⏳ Wait 15s for handler + SMTP send...');
console.log('📧 Check: mdjewel24682468@gmail.com');
await queue.close();
process.exit(0);
