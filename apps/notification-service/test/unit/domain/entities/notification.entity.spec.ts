/**
 * NotificationEntity — full lifecycle tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { EmailAddressVO } from '../../../../src/module/domain/value-objects/primitives/email-address.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { DeliveryFailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function buildEntity(): NotificationEntity {
  const channel = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('Order Confirmed'),
        body: NotificationBodyVO.create('Your order has been confirmed.'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.create(FIXED_USER_ID),
        channel,
        email: EmailAddressVO.create('customer@vubon.com.bd'),
      }),
    },
  });
}

describe('NotificationEntity', () => {
  let entity: NotificationEntity;

  beforeEach(() => {
    entity = buildEntity();
  });

  describe('create', () => {
    it('should create with pending status', () => {
      expect(entity.isPending()).toBe(true);
      expect(entity.status.value).toBe('pending');
    });

    it('should have delivery status queued', () => {
      expect(entity.deliveryStatus.value).toBe('queued');
    });

    it('should have unread read status', () => {
      expect(entity.isUnread()).toBe(true);
    });

    it('should start at version 1 (create event increments)', () => {
      expect(entity.version).toBe(1);
    });

    it('should emit NotificationCreatedEvent', () => {
      const events = entity.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0]?.type).toBe('notification.created');
    });
  });

  describe('queue', () => {
    it('should transition pending → queued', () => {
      entity.queue();
      expect(entity.isQueued()).toBe(true);
    });

    it('should throw if called twice', () => {
      entity.queue();
      expect(() => entity.queue()).toThrow();
    });
  });

  describe('markSent', () => {
    it('should transition queued → sent via startSending', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.markSent('msg-123');
      expect(entity.isSent()).toBe(true);
      expect(entity.providerMessageId).toBe('msg-123');
      expect(entity.sentAt).toBeDefined();
    });

    it('should throw if called from pending', () => {
      expect(() => entity.markSent()).toThrow();
    });
  });

  describe('markDelivered', () => {
    it('should transition sent → delivered', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.markSent('msg-123');
      entity.markDelivered();
      expect(entity.isDelivered()).toBe(true);
      expect(entity.deliveredAt).toBeDefined();
    });
  });

  describe('markRead', () => {
    it('should mark as read', () => {
      entity.markRead();
      expect(entity.isRead()).toBe(true);
      expect(entity.readAt).toBeDefined();
    });

    it('should throw when already read', () => {
      entity.markRead();
      expect(() => entity.markRead()).toThrow();
    });
  });

  describe('fail', () => {
    it('should transition queued → failed', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.fail(DeliveryFailureReasonVO.gatewayError());
      expect(entity.isFailed()).toBe(true);
      expect(entity.failureReason?.value).toBe('gateway_error');
      expect(entity.failedAt).toBeDefined();
    });
  });

  describe('cancel', () => {
    it('should cancel pending notification', () => {
      entity.cancel('customer requested', 'admin');
      expect(entity.isCancelled()).toBe(true);
      expect(entity.cancelledAt).toBeDefined();
    });

    it('should throw when cancelling delivered', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.markSent('msg-1');
      entity.markDelivered();
      expect(() => entity.cancel()).toThrow();
    });

    it('should throw when cancelling cancelled', () => {
      entity.cancel();
      expect(() => entity.cancel()).toThrow();
    });
  });

  describe('retry', () => {
    it('should retry from failed', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.fail(DeliveryFailureReasonVO.gatewayError());
      entity.retry();
      expect(entity.isPending()).toBe(true);
      expect(entity.retryAttempts).toBe(1);
      expect(entity.failureReason).toBeUndefined();
    });

    it('should throw when retrying from pending', () => {
      expect(() => entity.retry()).toThrow();
    });
  });

  describe('archive', () => {
    it('should archive delivered', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.markSent('msg-1');
      entity.markDelivered();
      entity.archive();
      expect(entity.isArchived()).toBe(true);
      expect(entity.archivedAt).toBeDefined();
    });
  });

  describe('expire', () => {
    it('should expire a pending notification', () => {
      entity.expire();
      expect(entity.isExpired()).toBe(true);
    });
  });

  describe('invariants', () => {
    it('should reject mismatched channel between notification and recipient', () => {
      expect(() =>
        NotificationEntity.create({
          id: FIXED_NOTIFICATION_ID,
          now: new Date().toISOString(),
          props: {
            type: NotificationTypeVO.transactional(),
            category: NotificationCategoryVO.order(),
            channel: NotificationChannelVO.email(),
            priority: NotificationPriorityVO.normal(),
            content: NotificationContentVO.create({
              title: NotificationTitleVO.create('t'),
              body: NotificationBodyVO.create('b'),
            }),
            recipient: NotificationRecipientVO.reconstitute({
              userId: UserIdVO.create(FIXED_USER_ID),
              channel: NotificationChannelVO.sms(),
              phone: { value: '+8801712345678' } as never,
            }),
          },
        }),
      ).toThrow();
    });
  });

  describe('domain events', () => {
    it('should accumulate events throughout lifecycle', () => {
      entity.queue();
      entity.startSending('smtp');
      entity.markSent('msg-1');
      entity.markDelivered();
      const events = entity.pullDomainEvents();
      const types = events.map((e) => e.type);
      expect(types).toContain('notification.created');
      expect(types).toContain('notification.queued');
      expect(types).toContain('notification.sending');
      expect(types).toContain('notification.sent');
      expect(types).toContain('notification.delivered');
    });

    it('should clear events after pull', () => {
      entity.queue();
      const events1 = entity.pullDomainEvents();
      const events2 = entity.pullDomainEvents();
      expect(events1.length).toBeGreaterThan(0);
      expect(events2.length).toBe(0);
    });
  });
});
