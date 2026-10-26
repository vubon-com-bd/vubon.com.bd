import { DigestItemEntity } from '@domain/entities/digest-item.entity.js';
import { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const item = (priority = 'normal') =>
  DigestItemVO.create({
    notificationId: NotificationIdVO.create(IDS.notificationId),
    category: NotificationCategoryVO.create('order'),
    priority: NotificationPriorityVO.create(priority),
    title: 'Order 1234',
    summary: 'Your order is confirmed',
    occurredAt: NOW,
  });

describe('DigestItemEntity (child)', () => {
  describe('create()', () => {
    it('creates digest item entity', () => {
      const entity = DigestItemEntity.create({
        id: 'di-1',
        digestId: DigestIdVO.create(IDS.digestId),
        item: item(),
        now: NOW,
      });
      expect(entity.id).toBe('di-1');
      expect(entity.isUrgent).toBe(false);
    });

    it('isUrgent true for critical priority', () => {
      const entity = DigestItemEntity.create({
        id: 'di-1',
        digestId: DigestIdVO.create(IDS.digestId),
        item: item('critical'),
        now: NOW,
      });
      expect(entity.isUrgent).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = DigestItemEntity.reconstitute({
        id: 'di-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          digestId: DigestIdVO.create(IDS.digestId),
          item: item(),
        },
      });
      expect(entity.id).toBe('di-1');
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = DigestItemEntity.create({
        id: 'di-1',
        digestId: DigestIdVO.create(IDS.digestId),
        item: item(),
        now: NOW,
      });
      expect(entity.digestId.value).toBe(IDS.digestId);
      expect(entity.item).toBeDefined();
    });
  });
});
