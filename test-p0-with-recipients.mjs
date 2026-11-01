import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `pwd2-${Date.now()}`, type: 'identity.auth.password_changed', aggregateId: 'auth-1', aggregateType: 'Auth', payload: { authId: 'auth-1', userId: 'u-test', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', changedAt: new Date().toISOString(), locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `lock2-${Date.now()}`, type: 'identity.auth.locked', aggregateId: 'auth-1', aggregateType: 'Auth', payload: { authId: 'auth-1', userId: 'u-test', reason: 'Multiple failed logins', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', phone: '+8801712345678', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `sess2-${Date.now()}`, type: 'identity.session.created', aggregateId: 'sess-1', aggregateType: 'Session', payload: { sessionId: 'sess-1', userId: 'u-test', deviceId: 'phone', ipAddress: '103.230.x.x', userAgent: 'Chrome/Mobile', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `rev2-${Date.now()}`, type: 'identity.session.revoked', aggregateId: 'sess-1', aggregateType: 'Session', payload: { sessionId: 'sess-1', userId: 'u-test', reason: 'user logout', name: 'রহিম উদ্দিন', email: 'rahim@test.bd', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
await queue.close();
process.exit(0);
