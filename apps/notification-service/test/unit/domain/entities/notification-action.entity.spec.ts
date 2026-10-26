import { NotificationActionEntity } from '@domain/entities/notification-action.entity.js';
import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const action = () =>
  NotificationActionVO.create({
    id: ActionIdVO.create('btn-accept'),
    type: ActionTypeVO.create('accept'),
    label: 'Accept',
  });

describe('NotificationActionEntity (child)', () => {
  describe('create()', () => {
    it('creates with zero triggerCount', () => {
      const entity = NotificationActionEntity.create({
        id: 'a-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        action: action(),
        now: NOW,
      });
      expect(entity.triggerCount).toBe(0);
      expect(entity.triggeredAt).toBeUndefined();
      expect(entity.triggeredBy).toBeUndefined();
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = NotificationActionEntity.reconstitute({
        id: 'a-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          notificationId: NotificationIdVO.create(IDS.notificationId),
          action: action(),
          triggeredAt: NOW,
          triggeredBy: IDS.userId,
          triggerCount: 3,
        },
      });
      expect(entity.triggerCount).toBe(3);
    });
  });

  describe('trigger()', () => {
    it('increments count + sets metadata', () => {
      const entity = NotificationActionEntity.create({
        id: 'a-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        action: action(),
        now: NOW,
      });
      entity.trigger(IDS.userId, NOW);
      expect(entity.triggerCount).toBe(1);
      expect(entity.triggeredBy).toBe(IDS.userId);
      expect(entity.triggeredAt).toBe(NOW);

      entity.trigger(IDS.userId, NOW);
      expect(entity.triggerCount).toBe(2);
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = NotificationActionEntity.create({
        id: 'a-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        action: action(),
        now: NOW,
      });
      expect(entity.notificationId.value).toBe(IDS.notificationId);
      expect(entity.action).toBeDefined();
    });
  });
});
