import { NotificationDeliveryEntity } from '@domain/entities/notification-delivery.entity.js';
import { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const delivery = (overrides: any = {}) =>
  NotificationDeliveryVO.create({
    status: DeliveryStatusVO.queued(),
    attemptCount: 0,
    maxAttempts: 3,
    ...overrides,
  });

describe('NotificationDeliveryEntity (child)', () => {
  describe('create()', () => {
    it('creates delivery entity', () => {
      const entity = NotificationDeliveryEntity.create({
        id: 'd-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        delivery: delivery(),
        now: NOW,
      });
      expect(entity.id).toBe('d-1');
      expect(entity.status.isQueued()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = NotificationDeliveryEntity.reconstitute({
        id: 'd-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          notificationId: NotificationIdVO.create(IDS.notificationId),
          delivery: delivery(),
          startedAt: NOW,
          completedAt: NOW,
        },
      });
      expect(entity.startedAt).toBe(NOW);
      expect(entity.completedAt).toBe(NOW);
    });
  });

  describe('transitionTo()', () => {
    it('updates status', () => {
      const entity = NotificationDeliveryEntity.create({
        id: 'd-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        delivery: delivery(),
        now: NOW,
      });
      entity.transitionTo(DeliveryStatusVO.sending());
      expect(entity.status.isSending()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes fields + canRetry', () => {
      const entity = NotificationDeliveryEntity.create({
        id: 'd-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        delivery: delivery(),
        now: NOW,
      });
      expect(entity.notificationId.value).toBe(IDS.notificationId);
      expect(entity.delivery).toBeDefined();
      expect(entity.canRetry).toBe(true); // queued → can retry
    });

    it('canRetry false when terminal', () => {
      const entity = NotificationDeliveryEntity.reconstitute({
        id: 'd-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          notificationId: NotificationIdVO.create(IDS.notificationId),
          delivery: delivery({ status: DeliveryStatusVO.delivered(), deliveredAt: NOW }),
        },
      });
      expect(entity.canRetry).toBe(false);
    });
  });
});
