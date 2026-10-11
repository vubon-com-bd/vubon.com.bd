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
    id: FIXED_NOTIFICATION_ID, now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch, priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'), body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID), channel: ch,
      }),
    },
  });
}

describe('NotificationService deeper branches', () => {
  let repo: ReturnType<typeof makeNotificationRepo>;
  let pref: ReturnType<typeof makePreferenceRepo>;
  let svc: NotificationService;
  beforeEach(() => {
    repo = makeNotificationRepo();
    pref = makePreferenceRepo();
    svc = new NotificationService(repo as never, pref as never, makeEventBridge() as never);
  });

  it('getById ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.getById({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r.id).toBe(FIXED_NOTIFICATION_ID);
  });

  it('getPublic ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.getPublic({ notificationId: FIXED_NOTIFICATION_ID });
  });

  it('getDetail ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.getDetail({ notificationId: FIXED_NOTIFICATION_ID });
  });

  it('cancel ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.cancel({ notificationId: FIXED_NOTIFICATION_ID, reason: 'x' }, 'actor');
    expect(repo.save).toHaveBeenCalled();
  });

  it('update draft', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.update({ notificationId: FIXED_NOTIFICATION_ID, title: 'X' } as never, 'actor');
  });

  it('update not updatable throws', async () => {
    const e = build();
    e.queue(); e.startSending('smtp'); e.markSent();
    repo.findByIdVO.mockResolvedValueOnce(e);
    await expect(svc.update({ notificationId: FIXED_NOTIFICATION_ID, title: 'X' } as never, 'actor')).rejects.toThrow();
  });

  it('delete soft', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.delete({ notificationId: FIXED_NOTIFICATION_ID, softDelete: true }, 'actor');
    expect(repo.softDelete).toHaveBeenCalled();
  });

  it('delete hard', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.delete({ notificationId: FIXED_NOTIFICATION_ID, softDelete: false }, 'actor');
    expect(repo.delete).toHaveBeenCalled();
  });

  it('retry ok', async () => {
    const e = build();
    e.queue(); e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    repo.findByIdVO.mockResolvedValueOnce(e);
    await svc.retry({ notificationId: FIXED_NOTIFICATION_ID }, 'actor');
  });

  it('markRead ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.markRead({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID });
  });

  it('markManyRead', async () => {
    repo.findByIdVO
      .mockResolvedValueOnce(build())
      .mockRejectedValueOnce(new Error('x'));
    const r = await svc.markManyRead({ notificationIds: [FIXED_NOTIFICATION_ID, 'x'], userId: FIXED_USER_ID });
    expect(r).toBe(1);
  });

  it('markAllRead', async () => {
    repo.findUnreadByUserId.mockResolvedValueOnce([build(), build()]);
    const r = await svc.markAllRead({ userId: FIXED_USER_ID });
    expect(r).toBe(2);
  });

  it('archive delivered', async () => {
    const e = build();
    e.queue(); e.startSending('smtp'); e.markSent(); e.markDelivered();
    repo.findByIdVO.mockResolvedValueOnce(e);
    await svc.archive({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID });
  });

  it('snooze', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.snooze({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID,
      snoozedUntil: new Date(Date.now() + 3600_000).toISOString(),
    });
  });

  it('star', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.star({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID });
  });

  it('list with unreadCount', async () => {
    repo.findPaginated.mockResolvedValueOnce({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 } as never);
    repo.countUnread.mockResolvedValueOnce(5);
    const r = await svc.list({ userId: FIXED_USER_ID, options: { page: 1, limit: 20 } });
    expect(r.unreadCount).toBe(5);
  });

  it('getStats byStatus fallback', async () => {
    repo.getStats.mockResolvedValueOnce({ total: 5, unread: 2, byChannel: {}, byStatus: {}, byCategory: {} } as never);
    const r = await svc.getStats({});
    expect(r.delivered).toBe(0);
  });

  it('getUnreadCount', async () => {
    repo.countUnread.mockResolvedValueOnce(7);
    const r = await svc.getUnreadCount(FIXED_USER_ID);
    expect(r.unreadCount).toBe(7);
  });
});
