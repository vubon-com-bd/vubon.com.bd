import { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';
import { NotificationAttemptVO } from '@domain/composites/notification-attempt.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { DeliveryAttemptVO } from '@domain/primitives/delivery-attempt.vo.js';
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const successAttempt = () =>
  NotificationAttemptVO.create({
    attempt: DeliveryAttemptVO.create({
      attemptNumber: 1,
      attemptedAt: NOW,
      succeeded: true,
    }),
  });

const failedAttempt = () =>
  NotificationAttemptVO.create({
    attempt: DeliveryAttemptVO.create({
      attemptNumber: 1,
      attemptedAt: NOW,
      succeeded: false,
      errorMessage: 'timeout',
    }),
    error: DeliveryErrorVO.create({
      reason: 'timeout',
      message: 'timeout',
      retryable: true,
    }),
  });

describe('NotificationAttemptEntity (child)', () => {
  describe('create()', () => {
    it('creates success attempt', () => {
      const entity = NotificationAttemptEntity.create({
        id: 'at-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        attempt: successAttempt(),
        now: NOW,
      });
      expect(entity.succeeded).toBe(true);
      expect(entity.isRetryable).toBe(false);
    });

    it('creates failed attempt', () => {
      const entity = NotificationAttemptEntity.create({
        id: 'at-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        attempt: failedAttempt(),
        now: NOW,
      });
      expect(entity.succeeded).toBe(false);
      expect(entity.isRetryable).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = NotificationAttemptEntity.reconstitute({
        id: 'at-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          notificationId: NotificationIdVO.create(IDS.notificationId),
          attempt: successAttempt(),
        },
      });
      expect(entity.succeeded).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = NotificationAttemptEntity.create({
        id: 'at-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        attempt: successAttempt(),
        now: NOW,
      });
      expect(entity.notificationId.value).toBe(IDS.notificationId);
      expect(entity.attempt).toBeDefined();
    });
  });
});
