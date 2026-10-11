/**
 * Notification service — exercise remaining uncovered branches
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { NotificationService } from '../../../../src/module/application/services/impl/notification.service.js';
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
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makePreferenceRepo, makeEventBridge } from '../../../helpers/mock-services.js';

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

function makeSvc() {
  const repo = makeNotificationRepo();
  const pref = makePreferenceRepo();
  const events = makeEventBridge();
  return {
    svc: new NotificationService(repo as never, pref as never, events as never),
    repo, pref, events,
  };
}

describe('NotificationService — deep branches', () => {
  let ctx: ReturnType<typeof makeSvc>;
  beforeEach(() => { ctx = makeSvc(); });

  it('send with all channel types', async () => {
    for (const ch of ['email', 'sms', 'push', 'in_app']) {
      const r = await ctx.svc.send({
        userId: FIXED_USER_ID, type: 'transactional', category: 'order',
        channels: [ch], title: 'T', body: 'B',
      } as never);
      expect(r.success).toBe(true);
    }
  });

  it('send multiple channels', async () => {
    const r = await ctx.svc.send({
      userId: FIXED_USER_ID, type: 'transactional', category: 'order',
      channels: ['email', 'in_app'], title: 'T', body: 'B',
    } as never);
    expect(r.success).toBe(true);
  });

  it('getById returns mapped DTO with all props', async () => {
    const e = build();
    e.queue();
    ctx.repo.findByIdVO.mockResolvedValueOnce(e);
    const r = await ctx.svc.getById({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
    expect(r.status).toBeDefined();
  });

  it('getPublic', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.getPublic({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('getDetail', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.getDetail({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r.notification.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('list with 100+ notifications', async () => {
    ctx.repo.findPaginated.mockResolvedValueOnce({
      items: [build()],
      total: 100,
      page: 1,
      limit: 20,
      totalPages: 5,
    } as never);
    ctx.repo.countUnread.mockResolvedValueOnce(50);
    const r = await ctx.svc.list({
      userId: FIXED_USER_ID,
      options: { page: 1, limit: 20 },
    });
    expect(r.unreadCount).toBe(50);
  });

  it('retry existing failed notification', async () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    ctx.repo.findByIdVO.mockResolvedValueOnce(e);
    const r = await ctx.svc.retry({ notificationId: FIXED_NOTIFICATION_ID }, 'actor');
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('markManyRead with mixed outcomes', async () => {
    ctx.repo.findByIdVO
      .mockResolvedValueOnce(build())
      .mockRejectedValueOnce(new Error('missing'));
    const r = await ctx.svc.markManyRead({
      notificationIds: [FIXED_NOTIFICATION_ID, 'missing-id'],
      userId: FIXED_USER_ID,
    });
    expect(r).toBe(1);
  });

  it('cancel existing pending', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.cancel({
      notificationId: FIXED_NOTIFICATION_ID, reason: 'user changed mind',
    }, 'actor');
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('delete hard', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    await ctx.svc.delete({ notificationId: FIXED_NOTIFICATION_ID, softDelete: false }, 'actor');
    expect(ctx.repo.delete).toHaveBeenCalled();
  });

  it('update draft', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.update({
      notificationId: FIXED_NOTIFICATION_ID, title: 'X',
    } as never, 'actor');
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('markRead existing unread', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.markRead({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID,
    });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('archive delivered', async () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.markSent();
    e.markDelivered();
    ctx.repo.findByIdVO.mockResolvedValueOnce(e);
    const r = await ctx.svc.archive({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID,
    });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('snooze existing', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.snooze({
      notificationId: FIXED_NOTIFICATION_ID,
      userId: FIXED_USER_ID,
      snoozedUntil: new Date(Date.now() + 3600_000).toISOString(),
    });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('star existing', async () => {
    ctx.repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await ctx.svc.star({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID,
    });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });
});
