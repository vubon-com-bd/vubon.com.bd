import { NotificationRecipientEntity } from '@domain/entities/notification-recipient.entity.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const recipient = () =>
  NotificationRecipientVO.create({
    userId: UserIdVO.create(IDS.userId),
    channel: NotificationChannelVO.email(),
    email: EmailAddressVO.create('user@example.com'),
  });

describe('NotificationRecipientEntity (child)', () => {
  describe('create()', () => {
    it('creates with queued status', () => {
      const entity = NotificationRecipientEntity.create({
        id: 'rec-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        recipient: recipient(),
        now: NOW,
      });
      expect(entity.deliveryStatus.isQueued()).toBe(true);
      expect(entity.deliveredAt).toBeUndefined();
      expect(entity.readAt).toBeUndefined();
      expect(entity.failureReason).toBeUndefined();
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = NotificationRecipientEntity.reconstitute({
        id: 'rec-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          notificationId: NotificationIdVO.create(IDS.notificationId),
          recipient: recipient(),
          deliveryStatus: NotificationRecipientEntity.create({
            id: 'rec-1',
            notificationId: NotificationIdVO.create(IDS.notificationId),
            recipient: recipient(),
            now: NOW,
          }).deliveryStatus,
          deliveredAt: NOW,
        },
      });
      expect(entity.deliveredAt).toBe(NOW);
    });
  });

  describe('markDelivered()', () => {
    it('sets delivered status + timestamp', () => {
      const entity = NotificationRecipientEntity.create({
        id: 'rec-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        recipient: recipient(),
        now: NOW,
      });
      entity.markDelivered(NOW);
      expect(entity.deliveredAt).toBe(NOW);
      expect(entity.deliveryStatus.isDelivered()).toBe(true);
    });
  });

  describe('markRead()', () => {
    it('sets readAt', () => {
      const entity = NotificationRecipientEntity.create({
        id: 'rec-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        recipient: recipient(),
        now: NOW,
      });
      entity.markRead(NOW);
      expect(entity.readAt).toBe(NOW);
    });
  });

  describe('markFailed()', () => {
    it('sets failed status + reason', () => {
      const entity = NotificationRecipientEntity.create({
        id: 'rec-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        recipient: recipient(),
        now: NOW,
      });
      entity.markFailed('invalid address');
      expect(entity.failureReason).toBe('invalid address');
      expect(entity.deliveryStatus.isFailed()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = NotificationRecipientEntity.create({
        id: 'rec-1',
        notificationId: NotificationIdVO.create(IDS.notificationId),
        recipient: recipient(),
        now: NOW,
      });
      expect(entity.notificationId.value).toBe(IDS.notificationId);
      expect(entity.recipient).toBeDefined();
    });
  });
});
