import { Queue } from 'bullmq';
const connection = { host: '127.0.0.1', port: 6379 };
const queue = new Queue('domain-events-notification', { connection });

const events = [
  { id: `pwd-${Date.now()}`, type: 'identity.auth.password_changed', aggregateId: 'auth-1', aggregateType: 'Auth', payload: { authId: 'auth-1', userId: 'u1', name: 'রহিম', changedAt: new Date().toISOString(), locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `lock-${Date.now()}`, type: 'identity.auth.locked', aggregateId: 'auth-1', aggregateType: 'Auth', payload: { authId: 'auth-1', userId: 'u1', reason: 'Multiple failed logins', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `sess-${Date.now()}`, type: 'identity.session.created', aggregateId: 'sess-1', aggregateType: 'Session', payload: { sessionId: 'sess-1', userId: 'u1', deviceId: 'phone', ipAddress: '103.230.x.x', userAgent: 'Chrome/Mobile', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
  { id: `rev-${Date.now()}`, type: 'identity.session.revoked', aggregateId: 'sess-1', aggregateType: 'Session', payload: { sessionId: 'sess-1', userId: 'u1', reason: 'user logout', name: 'রহিম', locale: 'bn' }, occurredAt: new Date().toISOString(), version: 1 },
];

for (const evt of events) {
  await queue.add(evt.type, evt, { jobId: `${evt.id}__domain-events-notification` });
  console.log(`✅ ${evt.type}`);
}
await queue.close();
process.exit(0);
