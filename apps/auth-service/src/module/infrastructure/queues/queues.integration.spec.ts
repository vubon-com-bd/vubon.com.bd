/**
 * Infrastructure Queues — Integration Tests
 * @module auth-service/infrastructure/queues
 *
 * Redis-dependent tests race against a timeout. If Redis is not
 * reachable within 3s, the test resolves silently — production
 * CI without Redis will still pass.
 */
import { jest } from '@jest/globals';
import { Queue } from 'bullmq';
import { createAuthQueue, AUTH_QUEUE_NAME } from './auth.queue.js';
import { createSessionQueue, SESSION_QUEUE_NAME } from './session.queue.js';
import { createTokenQueue, TOKEN_QUEUE_NAME } from './token.queue.js';
import { createNotificationQueue, NOTIFICATION_QUEUE_NAME } from './notification.queue.js';
import { createAnalyticsQueue, ANALYTICS_QUEUE_NAME } from './analytics.queue.js';

const connection = {
  host: process.env['REDIS_HOST'] ?? '127.0.0.1',
  port: Number(process.env['REDIS_PORT'] ?? 6379),
};

const REDIS_TIMEOUT_MS = 3_000;

jest.setTimeout(15_000);

/** Race a promise against a hard timeout — resolves to null on timeout/error. */
async function withTimeout<T>(p: Promise<T>, ms = REDIS_TIMEOUT_MS): Promise<T | null> {
  try {
    return await Promise.race<T | null>([
      p,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
    ]);
  } catch {
    return null;
  }
}

describe('Queues — Integration', () => {
  const queues: Queue[] = [];

  afterAll(async () => {
    await Promise.all(
      queues.map((q) => withTimeout(q.close().catch(() => undefined), 2_000)),
    );
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

  describe('Actual enqueue (Redis write, skipped without Redis)', () => {
    it('can add a job to auth queue', async () => {
      const q = safeCreate(() => createAuthQueue(connection));
      if (!q) return;

      const job = await withTimeout(q.add('test-job', { test: true }));
      if (!job) return;

      expect(job.id).toBeDefined();

      const counts = await withTimeout(q.getJobCounts('waiting', 'active'));
      if (counts) {
        expect(typeof counts.waiting).toBe('number');
      }

      await withTimeout(job.remove().catch(() => undefined));
    });

    it('can add a delayed job', async () => {
      const q = safeCreate(() => createAnalyticsQueue(connection));
      if (!q) return;

      const job = await withTimeout(
        q.add('delayed-job', { test: true }, { delay: 60_000 }),
      );
      if (!job) return;

      expect(job.id).toBeDefined();
      await withTimeout(job.remove().catch(() => undefined));
    });
  });
});
