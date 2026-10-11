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
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../helpers/mock-services.js';

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

describe('DeliveryService branches', () => {
  let repo: ReturnType<typeof makeNotificationRepo>;
  let svc: DeliveryService;
  beforeEach(() => {
    repo = makeNotificationRepo();
    svc = new DeliveryService(repo as never, makeEventBridge() as never);
  });

  it('getByNotification throws not found', async () => {
    await expect(svc.getByNotification(FIXED_NOTIFICATION_ID)).rejects.toThrow();
  });

  it('getByNotification ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.getByNotification(FIXED_NOTIFICATION_ID);
    expect(r.notificationId).toBe(FIXED_NOTIFICATION_ID);
  });

  it('list with all filters', async () => {
    repo.findPaginated.mockResolvedValueOnce({
      items: [build()], total: 1, page: 1, limit: 20, totalPages: 1,
    } as never);
    const r = await svc.list({
      page: 1, limit: 20, notificationId: FIXED_NOTIFICATION_ID,
      channel: 'email', status: 'sent', fromDate: '2026-01-01', toDate: '2026-12-31',
    });
    expect(r.items.length).toBe(1);
  });

  it('retry not found', async () => {
    await expect(svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });

  it('retry throws when not failed', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await expect(svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });

  it('retry success', async () => {
    const e = build();
    e.queue(); e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    repo.findByIdVO.mockResolvedValueOnce(e);
    const r = await svc.retry(FIXED_NOTIFICATION_ID, 'actor');
    expect(r.scheduled).toBe(true);
  });

  it('retry limit reached', async () => {
    const e = build();
    e.queue(); e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    for (let i = 0; i < 5; i++) {
      try { e.retry(); e.queue(); e.startSending('smtp'); e.fail(DeliveryFailureReasonVO.timeout()); } catch { /* ignore */ }
    }
    repo.findByIdVO.mockResolvedValueOnce(e);
    await expect(svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });

  it('retry permanent failure', async () => {
    const e = build();
    e.queue(); e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    repo.findByIdVO.mockResolvedValueOnce(e);
    await expect(svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });

  it('recordAttempt not found', async () => {
    await expect(svc.recordAttempt({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', provider: 'smtp',
      attempt: 1, success: true,
    })).rejects.toThrow();
  });

  it('recordAttempt success', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.recordAttempt({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', provider: 'smtp',
      attempt: 1, success: true, providerMessageId: 'm-1',
    });
    expect(repo.save).toHaveBeenCalled();
  });

  it('recordAttempt failure with reason', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.recordAttempt({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', provider: 'smtp',
      attempt: 1, success: false, failureReason: 'timeout', failureCode: 'T1',
    });
    expect(repo.save).toHaveBeenCalled();
  });

  it('recordAttempt failure without reason', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.recordAttempt({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', provider: 'smtp',
      attempt: 1, success: false,
    });
    expect(repo.save).toHaveBeenCalled();
  });
});
