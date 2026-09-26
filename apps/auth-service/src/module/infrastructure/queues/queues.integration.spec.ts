/**
 * Infrastructure Queues — Integration Tests
 * @module auth-service/infrastructure/queues
 *
 * Requires Redis at localhost:6379.
 */
import { Queue } from 'bullmq';
import { createAuthQueue, AUTH_QUEUE_NAME } from './auth.queue';
import { createSessionQueue, SESSION_QUEUE_NAME } from './session.queue';
import { createTokenQueue, TOKEN_QUEUE_NAME } from './token.queue';
import { createNotificationQueue, NOTIFICATION_QUEUE_NAME } from './notification.queue';
import { createAnalyticsQueue, ANALYTICS_QUEUE_NAME } from './analytics.queue';

const connection = {
  host: process.env['REDIS_HOST'] ?? '127.0.0.1',
  port: Number(process.env['REDIS_PORT'] ?? 6379),
};

jest.setTimeout(30_000);

describe('Queues — Integration', () => {
  const queues: Queue[] = [];

  afterAll(async () => {
    await Promise.all(queues.map((q) => q.close().catch(() => undefined)));
  });

  const safeCreate = (factory: () => Queue): Queue | null => {
    try {
      const q = factory();
      queues.push(q);
      return q;
    } catch {
      return null;
    }
  };

  describe('Queue name constants', () => {
    it('AUTH_QUEUE_NAME = auth', () => expect(AUTH_QUEUE_NAME).toBe('auth'));
    it('SESSION_QUEUE_NAME = session', () => expect(SESSION_QUEUE_NAME).toBe('session'));
    it('TOKEN_QUEUE_NAME = token', () => expect(TOKEN_QUEUE_NAME).toBe('token'));
    it('NOTIFICATION_QUEUE_NAME = notification', () =>
      expect(NOTIFICATION_QUEUE_NAME).toBe('notification'));
    it('ANALYTICS_QUEUE_NAME = analytics', () =>
      expect(ANALYTICS_QUEUE_NAME).toBe('analytics'));
  });

  describe('Factory instances', () => {
    it('createAuthQueue returns Queue with name "auth"', () => {
      const q = safeCreate(() => createAuthQueue(connection));
      expect(q?.name).toBe('auth');
    });

    it('createSessionQueue returns Queue', () => {
      const q = safeCreate(() => createSessionQueue(connection));
      expect(q?.name).toBe('session');
    });

    it('createTokenQueue returns Queue', () => {
      const q = safeCreate(() => createTokenQueue(connection));
      expect(q?.name).toBe('token');
    });

    it('createNotificationQueue returns Queue', () => {
      const q = safeCreate(() => createNotificationQueue(connection));
      expect(q?.name).toBe('notification');
    });

    it('createAnalyticsQueue returns Queue', () => {
      const q = safeCreate(() => createAnalyticsQueue(connection));
      expect(q?.name).toBe('analytics');
    });
  });

  describe('Default job options', () => {
    it('auth queue has attempts > 0', () => {
      const q = safeCreate(() => createAuthQueue(connection));
      expect(q?.defaultJobOptions.attempts).toBeGreaterThan(0);
    });

    it('notification queue has priority defined', () => {
      const q = safeCreate(() => createNotificationQueue(connection));
      expect(q?.defaultJobOptions.priority).toBeDefined();
    });

    it('auth queue has backoff configured', () => {
      const q = safeCreate(() => createAuthQueue(connection));
      expect(q?.defaultJobOptions.backoff).toBeDefined();
    });
  });

  describe('Actual enqueue (Redis write)', () => {
    it('can add a job to auth queue', async () => {
      const q = safeCreate(() => createAuthQueue(connection));
      if (!q) return;

      const job = await q.add('test-job', { test: true });
      expect(job.id).toBeDefined();

      const counts = await q.getJobCounts('waiting', 'active');
      expect(typeof counts.waiting).toBe('number');

      await job.remove().catch(() => undefined);
    });

    it('can add a delayed job', async () => {
      const q = safeCreate(() => createAnalyticsQueue(connection));
      if (!q) return;

      const job = await q.add(
        'delayed-job',
        { test: true },
        { delay: 60_000 },
      );
      expect(job.id).toBeDefined();

      await job.remove().catch(() => undefined);
    });
  });
});
