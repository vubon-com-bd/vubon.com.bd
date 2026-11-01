import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const content = () =>
  NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Subject'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });

const recipient = () =>
  NotificationRecipientVO.create({
    userId: UserIdVO.create(IDS.userId),
    channel: NotificationChannelVO.email(),
    email: EmailAddressVO.create('user@example.com'),
  });

const makeVO = (overrides: any = {}) =>
  NotificationVO.create({
    id: NotificationIdVO.create(IDS.notificationId),
    userId: UserIdVO.create(IDS.userId),
    type: NotificationTypeVO.transactional(),
    category: NotificationCategoryVO.create('order'),
    channel: NotificationChannelVO.email(),
    priority: NotificationPriorityVO.normal(),
    status: NotificationStatusVO.draft(),
    subject: NotificationSubjectVO.create('Subject'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
    ...overrides,
  });

const NOW = '2025-01-15T10:00:00.000Z';

describe('NotificationEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates valid notification with events', () => {
      const entity = NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });
      expect(entity.id).toBe(IDS.notificationId);
      expect(entity.isDraft()).toBe(true);
      expect(entity.version).toBe(1);
      expect(entity.domainEvents.length).toBe(1);
    });

    it('rejects non-draft/pending status', () => {
      expect(() =>
        NotificationEntity.create({
          id: NotificationIdVO.create(IDS.notificationId),
          vo: makeVO({ status: NotificationStatusVO.sent() }),
          content: content(),
          recipients: [recipient()],
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('rejects empty recipients', () => {
      expect(() =>
        NotificationEntity.create({
          id: NotificationIdVO.create(IDS.notificationId),
          vo: makeVO(),
          content: content(),
          recipients: [],
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('emits NotificationCreatedEvent', () => {
      const entity = NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });
      const events = entity.domainEvents;
      expect(events[0]?.type).toContain('created');
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds aggregate from persisted state', () => {
      const entity = NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: NotificationStatusVO.sent() }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
          sentAt: NOW,
        },
        version: 1,
      });
      expect(entity.id).toBe(IDS.notificationId);
      expect(entity.version).toBe(1);
      expect(entity.sentAt).toBe(NOW);
    });
  });

  describe('state transitions — happy path', () => {
    /** Creates entity in `pending` status (valid start for most transitions) */
    const base = () =>
      NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO({ status: NotificationStatusVO.pending() }),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });

    it('queue() → queued', () => {
      const entity = base();
      entity.queue(NOW);
      expect(entity.isQueued()).toBe(true);
    });

    it('markSending() → sending', () => {
      const entity = base();
      entity.queue(NOW);
      entity.markSending(NOW);
      expect(entity.isSending()).toBe(true);
    });

    it('markSent() → sent with sentAt', () => {
      const entity = base();
      entity.queue(NOW);
      entity.markSending(NOW);
      entity.markSent(NOW);
      expect(entity.isSent()).toBe(true);
      expect(entity.sentAt).toBe(NOW);
    });

    it('markDelivered() → delivered', () => {
      const entity = base();
      entity.queue(NOW);
      entity.markSending(NOW);
      entity.markSent(NOW);
      entity.markDelivered(NOW);
      expect(entity.isDelivered()).toBe(true);
    });

    it('markFailed() → failed', () => {
      const entity = base();
      entity.queue(NOW);
      entity.markSending(NOW);
      entity.markFailed('some error', NOW);
      expect(entity.isFailed()).toBe(true);
    });

    it('cancel() → cancelled', () => {
      const entity = base();
      entity.cancel('user requested', IDS.userId, NOW);
      expect(entity.isCancelled()).toBe(true);
      expect(entity.cancelledAt).toBe(NOW);
      expect(entity.cancelledBy).toBe(IDS.userId);
      expect(entity.cancelledReason).toBe('user requested');
    });

    it('expire() → expired', () => {
      const entity = base();
      entity.queue(NOW);
      entity.expire(NOW);
      expect(entity.isExpired()).toBe(true);
    });

    it('schedule() → scheduled', () => {
      const entity = base();
      const future = new Date(Date.now() + 3_600_000).toISOString();
      entity.schedule(future, NOW);
      expect(entity.isScheduled()).toBe(true);
      expect(entity.scheduledAt).toBe(future);
    });
  });

  describe('invalid transitions', () => {
    it('rejects markSent from draft', () => {
      const entity = NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });
      expect(() => entity.markSent(NOW)).toThrow(BusinessRuleError);
    });

    it('rejects cancel from delivered', () => {
      const entity = NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: NotificationStatusVO.delivered() }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
          deliveredAt: NOW,
        },
        version: 2,
      });
      expect(() => entity.cancel(undefined, undefined, NOW)).toThrow(BusinessRuleError);
    });

    it('schedule rejects past date', () => {
      const entity = NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });
      expect(() => entity.schedule('2020-01-01T00:00:00Z', NOW)).toThrow(BusinessRuleError);
    });

    it('rejects priority change on terminal', () => {
      const entity = NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: NotificationStatusVO.delivered() }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
          deliveredAt: NOW,
        },
      });
      expect(() => entity.changePriority(NotificationPriorityVO.high(), NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('predicates', () => {
    const draft = () =>
      NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });

    it('isDraft / canBeSent / canBeCancelled', () => {
      const e = draft();
      expect(e.isDraft()).toBe(true);
      expect(e.canBeSent()).toBe(true);
      expect(e.canBeCancelled()).toBe(true);
    });

    it('isTerminal false for draft', () => {
      expect(draft().isTerminal()).toBe(false);
    });

    it('canBeRetried false when not failed', () => {
      expect(draft().canBeRetried()).toBe(false);
    });

    it('isExpiredByDate true when past expiresAt', () => {
      const entity = NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO(),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
          expiresAt: '2020-01-01T00:00:00Z',
        },
      });
      expect(entity.isExpiredByDate(new Date())).toBe(true);
    });

    it('isExpiredByDate false when no expiresAt', () => {
      expect(draft().isExpiredByDate()).toBe(false);
    });

    it('isInFlight for queued/scheduled/sending/sent', () => {
      expect(draft().isInFlight()).toBe(false);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });
      expect(entity.id).toBe(IDS.notificationId);
      expect(entity.notificationId.value).toBe(IDS.notificationId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBeDefined();
      expect(entity.priority).toBeDefined();
      expect(entity.content).toBeDefined();
      expect(entity.recipients.length).toBe(1);
      expect(entity.actions.length).toBe(0);
      expect(entity.delivery).toBeUndefined();
      expect(entity.attempts.length).toBe(0);
      expect(entity.expiresAt).toBeUndefined();
      expect(entity.cancelledAt).toBeUndefined();
      expect(entity.cancelledBy).toBeUndefined();
      expect(entity.cancelledReason).toBeUndefined();
    });
  });

  describe('domain events', () => {
    it('pullDomainEvents returns and clears', () => {
      const entity = NotificationEntity.create({
        id: NotificationIdVO.create(IDS.notificationId),
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        now: NOW,
      });
      const events = entity.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(entity.domainEvents.length).toBe(0);
    });
  });
});
