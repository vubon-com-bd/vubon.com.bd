/**
 * Infrastructure Queues — Unit Tests
 * @module auth-service/infrastructure/queues
 *
 * Queues are factory functions that return BullMQ Queue instances.
 * These tests verify factory signatures + returned shape.
 */
import {
  createAuthQueue,
  AUTH_QUEUE_NAME,
} from './auth.queue';
import {
  createSessionQueue,
  SESSION_QUEUE_NAME,
} from './session.queue';
import {
  createTokenQueue,
  TOKEN_QUEUE_NAME,
} from './token.queue';
import {
  createNotificationQueue,
  NOTIFICATION_QUEUE_NAME,
} from './notification.queue';
import {
  createAnalyticsQueue,
  ANALYTICS_QUEUE_NAME,
} from './analytics.queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

const connection = { host: 'localhost', port: 6379 };

describe('Infrastructure Queues', () => {
  describe('Queue name constants', () => {
    it('AUTH_QUEUE_NAME should match QUEUE_NAME.AUTH', () => {
      expect(AUTH_QUEUE_NAME).toBe(QUEUE_NAME.AUTH);
    });

    it('SESSION_QUEUE_NAME should match QUEUE_NAME.SESSION', () => {
      expect(SESSION_QUEUE_NAME).toBe(QUEUE_NAME.SESSION);
    });

    it('TOKEN_QUEUE_NAME should match QUEUE_NAME.TOKEN', () => {
      expect(TOKEN_QUEUE_NAME).toBe(QUEUE_NAME.TOKEN);
    });

    it('NOTIFICATION_QUEUE_NAME should match QUEUE_NAME.NOTIFICATION', () => {
      expect(NOTIFICATION_QUEUE_NAME).toBe(QUEUE_NAME.NOTIFICATION);
    });

    it('ANALYTICS_QUEUE_NAME should match QUEUE_NAME.ANALYTICS', () => {
      expect(ANALYTICS_QUEUE_NAME).toBe(QUEUE_NAME.ANALYTICS);
    });
  });

  describe('Queue factory functions', () => {
    it('createAuthQueue should return a Queue instance', () => {
      const queue = createAuthQueue(connection);
      expect(queue).toBeDefined();
      expect(queue.name).toBe(QUEUE_NAME.AUTH);
      expect(typeof queue.close).toBe('function');
    });

    it('createSessionQueue should return a Queue instance', () => {
      const queue = createSessionQueue(connection);
      expect(queue.name).toBe(QUEUE_NAME.SESSION);
    });

    it('createTokenQueue should return a Queue instance', () => {
      const queue = createTokenQueue(connection);
      expect(queue.name).toBe(QUEUE_NAME.TOKEN);
    });

    it('createNotificationQueue should return a Queue instance', () => {
      const queue = createNotificationQueue(connection);
      expect(queue.name).toBe(QUEUE_NAME.NOTIFICATION);
    });

    it('createAnalyticsQueue should return a Queue instance', () => {
      const queue = createAnalyticsQueue(connection);
      expect(queue.name).toBe(QUEUE_NAME.ANALYTICS);
    });

    it('all queues should have default job options', () => {
      const queues = [
        createAuthQueue(connection),
        createSessionQueue(connection),
        createTokenQueue(connection),
        createNotificationQueue(connection),
        createAnalyticsQueue(connection),
      ];

      queues.forEach((q) => {
        expect(q.defaultJobOptions).toBeDefined();
      });

      // Cleanup
      queues.forEach((q) => void q.close());
    });
  });
});
