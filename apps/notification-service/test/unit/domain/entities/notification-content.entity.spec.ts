import { NotificationContentEntity } from '@domain/entities/notification-content.entity.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const content = () =>
  NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Subject'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });

describe('NotificationContentEntity (child)', () => {
  describe('create()', () => {
    it('creates content entity', () => {
      const entity = NotificationContentEntity.create({
        id: 'content-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        content: content(),
        now: NOW,
      });
      expect(entity.id).toBe('content-1');
      expect(entity.renderedAt).toBeUndefined();
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = NotificationContentEntity.reconstitute({
        id: 'content-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          notificationId: NotificationIdVO.create(IDS.notificationId),
          content: content(),
          renderedAt: NOW,
        },
      });
      expect(entity.renderedAt).toBe(NOW);
    });
  });

  describe('markRendered()', () => {
    it('sets renderedAt', () => {
      const entity = NotificationContentEntity.create({
        id: 'content-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        content: content(),
        now: NOW,
      });
      entity.markRendered(NOW);
      expect(entity.renderedAt).toBe(NOW);
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = NotificationContentEntity.create({
        id: 'content-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        content: content(),
        now: NOW,
      });
      expect(entity.notificationId.value).toBe(IDS.notificationId);
      expect(entity.content).toBeDefined();
    });
  });
});
