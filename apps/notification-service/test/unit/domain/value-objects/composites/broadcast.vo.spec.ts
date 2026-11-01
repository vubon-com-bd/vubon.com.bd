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
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const content = () =>
  NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Hi'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });

const makeProps = (overrides: any = {}) => ({
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

describe('BroadcastVO', () => {
  describe('create()', () => {
    it('creates valid broadcast', () => {
      const vo = BroadcastVO.create(makeProps());
      expect(vo.name).toBe('Big Sale');
    });

    it('rejects empty name', () => {
      expect(() => BroadcastVO.create(makeProps({ name: '' }))).toThrow(ValidationError);
    });

    it('rejects no channels', () => {
      expect(() => BroadcastVO.create(makeProps({ channels: [] }))).toThrow(ValidationError);
    });

    it('rejects no template AND no content', () => {
      expect(() =>
        BroadcastVO.create(makeProps({ content: undefined, templateId: undefined })),
      ).toThrow(ValidationError);
    });

    it('rejects both template + content', () => {
      expect(() =>
        BroadcastVO.create(
          makeProps({
            content: content(),
            templateId: TemplateIdVO.create(IDS.templateId),
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('accepts template-only', () => {
      const vo = BroadcastVO.create(
        makeProps({ content: undefined, templateId: TemplateIdVO.create(IDS.templateId) }),
      );
      expect(vo.usesTemplate()).toBe(true);
    });

    it('rejects recipientCount > 1,000,000', () => {
      expect(() =>
        BroadcastVO.create(makeProps({ recipientCount: 1_000_001 })),
      ).toThrow(ValidationError);
    });

    it('rejects sent+failed > recipientCount', () => {
      expect(() =>
        BroadcastVO.create(makeProps({ recipientCount: 10, sentCount: 8, failedCount: 5 })),
      ).toThrow(ValidationError);
    });

    it('rejects sent status without completedAt', () => {
      expect(() =>
        BroadcastVO.create(makeProps({ status: BroadcastStatusVO.sent() })),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = BroadcastVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('status predicates', () => {
    it.each([
      ['draft', 'isDraft'],
      ['scheduled', 'isScheduled'],
      ['sending', 'isSending'],
      ['sent', 'isSent'],
      ['failed', 'isFailed'],
      ['cancelled', 'isCancelled'],
    ] as const)('%s → %s', (status, pred) => {
      const vo = BroadcastVO.reconstitute(
        makeProps({ status: BroadcastStatusVO.create(status) }),
      );
      expect((vo[pred] as () => boolean)()).toBe(true);
    });

    it('isTerminal for sent', () => {
      expect(
        BroadcastVO.reconstitute(makeProps({ status: BroadcastStatusVO.sent() })).isTerminal(),
      ).toBe(true);
    });

    it('canBeCancelled for draft', () => {
      expect(BroadcastVO.reconstitute(makeProps()).canBeCancelled()).toBe(true);
    });
  });

  describe('approval', () => {
    it('isApproved false when no approvedBy', () => {
      expect(BroadcastVO.reconstitute(makeProps()).isApproved()).toBe(false);
    });

    it('isApproved true when approvedBy set', () => {
      const vo = BroadcastVO.reconstitute(
        makeProps({ approvedBy: UserIdVO.create(IDS.userId2) }),
      );
      expect(vo.isApproved()).toBe(true);
    });

    it('requiresApproval when not approved', () => {
      expect(BroadcastVO.reconstitute(makeProps()).requiresApproval()).toBe(true);
    });

    it('requiresApproval false when approved', () => {
      const vo = BroadcastVO.reconstitute(
        makeProps({ approvedBy: UserIdVO.create(IDS.userId2) }),
      );
      expect(vo.requiresApproval()).toBe(false);
    });
  });

  describe('content/template', () => {
    it('usesTemplate false when inline content', () => {
      expect(BroadcastVO.reconstitute(makeProps()).usesTemplate()).toBe(false);
      expect(BroadcastVO.reconstitute(makeProps()).usesInlineContent()).toBe(true);
    });
  });

  describe('pendingCount / successRate / channelsCount / hasChannel', () => {
    it('pendingCount = recipient - sent - failed', () => {
      const vo = BroadcastVO.reconstitute(
        makeProps({ recipientCount: 100, sentCount: 30, failedCount: 5 }),
      );
      expect(vo.pendingCount).toBe(65);
    });

    it('successRate when sent > 0', () => {
      const vo = BroadcastVO.reconstitute(
        makeProps({ recipientCount: 100, sentCount: 80, failedCount: 20 }),
      );
      expect(vo.successRate).toBeCloseTo(0.8, 2);
    });

    it('successRate 0 when sent is 0', () => {
      expect(BroadcastVO.reconstitute(makeProps()).successRate).toBe(0);
    });

    it('channelsCount', () => {
      expect(BroadcastVO.reconstitute(makeProps()).channelsCount).toBe(1);
    });

    it('hasChannel true/false', () => {
      const vo = BroadcastVO.reconstitute(makeProps());
      expect(vo.hasChannel('email')).toBe(true);
      expect(vo.hasChannel('sms')).toBe(false);
    });
  });

  describe('withStatus / withProgress / withApproval', () => {
    const base = BroadcastVO.reconstitute(makeProps());

    it('withStatus returns new VO', () => {
      const updated = base.withStatus(BroadcastStatusVO.sending());
      expect(updated.isSending()).toBe(true);
    });

    it('withProgress updates counts', () => {
      const updated = base.withProgress(50, 10);
      expect(updated.sentCount).toBe(50);
      expect(updated.failedCount).toBe(10);
    });

    it('withApproval sets approver', () => {
      const updated = base.withApproval(UserIdVO.create(IDS.userId2));
      expect(updated.isApproved()).toBe(true);
    });
  });

  describe('getters', () => {
    const vo = BroadcastVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.id).toBeDefined();
      expect(vo.name).toBe('Big Sale');
      expect(vo.type).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.audience).toBeDefined();
      expect(vo.channels.length).toBe(1);
      expect(vo.content).toBeDefined();
      expect(vo.templateId).toBeUndefined();
      expect(vo.createdBy).toBeDefined();
      expect(vo.approvedBy).toBeUndefined();
      expect(vo.scheduledAt).toBeUndefined();
      expect(vo.startedAt).toBeUndefined();
      expect(vo.completedAt).toBeUndefined();
      expect(vo.recipientCount).toBe(100);
      expect(vo.sentCount).toBe(0);
      expect(vo.failedCount).toBe(0);
    });
  });
});
