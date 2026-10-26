import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();

const content = () =>
  NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Hi'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });

const makeVO = (overrides: any = {}) =>
  BroadcastVO.create({
    id: BroadcastIdVO.create(IDS.broadcastId),
    name: 'Big Sale',
    type: BroadcastTypeVO.create('all_users'),
    status: BroadcastStatusVO.draft(),
    audience: BroadcastAudienceVO.create({ target: 'all' }),
    channels: [NotificationChannelVO.email()],
    content: content(),
    createdBy: UserIdVO.create(IDS.userId),
    recipientCount: 100,
    sentCount: 0,
    failedCount: 0,
    ...overrides,
  });

describe('BroadcastEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates with draft status + event', () => {
      const entity = BroadcastEntity.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isDraft()).toBe(true);
      expect(entity.domainEvents.length).toBe(1);
    });

    it('rejects non-draft status', () => {
      expect(() =>
        BroadcastEntity.create({
          id: BroadcastIdVO.create(IDS.broadcastId),
          vo: makeVO({ status: BroadcastStatusVO.scheduled() }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.broadcastId);
    });
  });

  describe('approve()', () => {
    it('sets approvedBy + emits event', () => {
      const entity = BroadcastEntity.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        vo: makeVO(),
        now: NOW,
      });
      entity.approve(UserIdVO.create(IDS.userId2), NOW);
      expect(entity.vo.isApproved()).toBe(true);
    });

    it('rejects approve when not draft', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: BroadcastStatusVO.scheduled() }) },
      });
      expect(() => entity.approve(UserIdVO.create(IDS.userId2), NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('schedule()', () => {
    it('draft → scheduled', () => {
      const entity = BroadcastEntity.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        vo: makeVO(),
        now: NOW,
      });
      entity.schedule(FUTURE, NOW);
      expect(entity.isScheduled()).toBe(true);
    });
  });

  describe('start()', () => {
    it('scheduled → sending', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            status: BroadcastStatusVO.scheduled(),
            approvedBy: UserIdVO.create(IDS.userId2),
          }),
        },
      });
      entity.start(NOW);
      expect(entity.isSending()).toBe(true);
    });

    it('rejects start without approval', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: BroadcastStatusVO.scheduled() }) },
      });
      expect(() => entity.start(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('updateProgress()', () => {
    it('updates sent/failed counts while sending', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            status: BroadcastStatusVO.sending(),
            approvedBy: UserIdVO.create(IDS.userId2),
          }),
        },
      });
      entity.updateProgress(50, 5, NOW);
      expect(entity.sentCount).toBe(50);
      expect(entity.failedCount).toBe(5);
    });

    it('rejects updateProgress when not sending', () => {
      const entity = BroadcastEntity.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        vo: makeVO(),
        now: NOW,
      });
      expect(() => entity.updateProgress(10, 0, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('complete()', () => {
    it('sending → sent', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            status: BroadcastStatusVO.sending(),
            approvedBy: UserIdVO.create(IDS.userId2),
          }),
        },
      });
      entity.complete(NOW);
      expect(entity.isSent()).toBe(true);
    });
  });

  describe('fail()', () => {
    it('sending → failed', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            status: BroadcastStatusVO.sending(),
            approvedBy: UserIdVO.create(IDS.userId2),
          }),
        },
      });
      entity.fail('rate limit exceeded', NOW);
      expect(entity.isFailed()).toBe(true);
      expect(entity.failureReason).toBe('rate limit exceeded');
    });
  });

  describe('cancel()', () => {
    it('draft → cancelled', () => {
      const entity = BroadcastEntity.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        vo: makeVO(),
        now: NOW,
      });
      entity.cancel('user requested', IDS.userId, NOW);
      expect(entity.isCancelled()).toBe(true);
      expect(entity.cancelledBy).toBe(IDS.userId);
      expect(entity.cancelledReason).toBe('user requested');
    });

    it('rejects cancel when already sent', () => {
      const entity = BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            status: BroadcastStatusVO.sent(),
            approvedBy: UserIdVO.create(IDS.userId2),
            completedAt: NOW,
          }),
        },
      });
      expect(() => entity.cancel(undefined, undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = BroadcastEntity.create({
        id: BroadcastIdVO.create(IDS.broadcastId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(IDS.broadcastId);
      expect(entity.broadcastId.value).toBe(IDS.broadcastId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBeDefined();
      expect(entity.recipientCount).toBe(100);
      expect(entity.sentCount).toBe(0);
      expect(entity.failedCount).toBe(0);
      expect(entity.cancelledAt).toBeUndefined();
      expect(entity.cancelledBy).toBeUndefined();
      expect(entity.cancelledReason).toBeUndefined();
      expect(entity.failureReason).toBeUndefined();
    });
  });
});
