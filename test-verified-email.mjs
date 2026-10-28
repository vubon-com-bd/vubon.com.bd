import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const event = {
  id: `verify-test-${Date.now()}`,
  type: 'identity.user.email_verified',
  aggregateId: 'user-verify-test',
  aggregateType: 'User',
  payload: {
    userId: 'user-verify-test',
    email: 'mdjewel24682468@gmail.com',
    name: 'Jewel Ahmed',
    verifiedAt: new Date().toISOString(),
    locale: 'bn',
  },
  occurredAt: new Date().toISOString(),
  version: 1,
};

await queue.add(event.type, event, { jobId: `${event.id}__domain-events-notification` });
console.log('✅ Event sent: identity.user.email_verified');
console.log('📧 Check: mdjewel24682468@gmail.com');

await queue.close();
process.exit(0);
