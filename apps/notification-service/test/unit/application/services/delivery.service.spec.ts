import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeliveryService } from '../../../../src/module/application/services/impl/delivery.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { DeliveryFailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID),
        channel: ch,
      }),
    },
  });
}

function makeService() {
  const repo = makeNotificationRepo();
  const events = makeEventBridge();
  const svc = new DeliveryService(repo as never, events as never);
  return { svc, repo, events };
}

describe('DeliveryService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('getByNotification', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getByNotification(FIXED_NOTIFICATION_ID)).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getByNotification(FIXED_NOTIFICATION_ID);
      expect(r.notificationId).toBe(FIXED_NOTIFICATION_ID);
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('maps items', async () => {
      ctx.repo.findPaginated.mockResolvedValueOnce({
        items: [build()], total: 1, page: 1, limit: 20, totalPages: 1,
      } as never);
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.items.length).toBe(1);
    });
  });

  describe('retry', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });

    it('throws when not failed', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      await expect(ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });

    it('schedules retry for failed', async () => {
      const e = build();
      e.queue();
      e.startSending('smtp');
      e.fail(DeliveryFailureReasonVO.timeout());
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor');
      expect(r.scheduled).toBe(true);
    });

    it('throws when retry limit reached', async () => {
      const e = build();
      e.queue();
      e.startSending('smtp');
      e.fail(DeliveryFailureReasonVO.timeout());
      for (let i = 0; i < 5; i++) {
        try {
          e.retry();
          e.queue();
          e.startSending('smtp');
          e.fail(DeliveryFailureReasonVO.timeout());
        } catch { /* ignore */ }
      }
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      await expect(ctx.svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
    });
  });

  describe('recordAttempt', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.recordAttempt({
        notificationId: FIXED_NOTIFICATION_ID,
        channel: 'email', provider: 'smtp',
        attempt: 1, success: true,
      })).rejects.toThrow();
    });

    it('records success', async () => {
      const e = build();
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.recordAttempt({
        notificationId: FIXED_NOTIFICATION_ID,
        channel: 'email', provider: 'smtp', attempt: 1,
        success: true, providerMessageId: 'msg-1',
      });
      expect(r).toBeDefined();
    });

    it('records failure with reason', async () => {
      const e = build();
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.recordAttempt({
        notificationId: FIXED_NOTIFICATION_ID,
        channel: 'email', provider: 'smtp', attempt: 1,
        success: false, failureReason: 'timeout', failureCode: 'T1',
      });
      expect(r).toBeDefined();
    });

    it('records failure without reason', async () => {
      const e = build();
      ctx.repo.findByIdVO.mockResolvedValueOnce(e);
      const r = await ctx.svc.recordAttempt({
        notificationId: FIXED_NOTIFICATION_ID,
        channel: 'email', provider: 'smtp', attempt: 1,
        success: false,
      });
      expect(r).toBeDefined();
    });
  });
});
