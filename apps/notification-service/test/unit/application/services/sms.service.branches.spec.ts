import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SmsService } from '../../../../src/module/application/services/impl/sms.service.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';
import { makeNotificationRepo, makeEventBridge } from '../../../helpers/mock-services.js';

function build(hasPhone = true): NotificationEntity {
  const ch = NotificationChannelVO.sms();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID, now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch, priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'), body: NotificationBodyVO.create('Body'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID), channel: ch,
        phone: hasPhone ? { value: '+8801712345678' } as never : undefined,
      }),
    },
  });
}

describe('SmsService branches', () => {
  let repo: ReturnType<typeof makeNotificationRepo>;
  let svc: SmsService;
  beforeEach(() => {
    repo = makeNotificationRepo();
    svc = new SmsService(repo as never, makeEventBridge() as never);
  });

  it('send single', async () => {
    const r = await svc.send({ to: '+8801712345678', message: 'M' });
    expect(r.success).toBe(true);
  });

  it('send empty array throws', async () => {
    await expect(svc.send({ to: [], message: 'M' } as never)).rejects.toThrow();
  });

  it('send array of recipients uses first', async () => {
    await svc.send({ to: ['+8801712345678', '+8801812345678'], message: 'M' });
  });

  it('sendBulk', async () => {
    const r = await svc.sendBulk({ recipients: ['+8801712345678'], message: 'M' });
    expect(r.length).toBe(1);
  });

  it('getById not found', async () => {
    await expect(svc.getById({ smsId: FIXED_NOTIFICATION_ID })).rejects.toThrow();
  });

  it('getById ok with phone', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build(true));
    const r = await svc.getById({ smsId: FIXED_NOTIFICATION_ID });
    expect(r.to).toBe('+8801712345678');
  });

  it('getById ok without phone', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build(false));
    const r = await svc.getById({ smsId: FIXED_NOTIFICATION_ID });
    expect(r.to).toBe('');
  });

  it('list with items', async () => {
    repo.findPaginated.mockResolvedValueOnce({
      items: [build(true)], total: 1, page: 1, limit: 20, totalPages: 1,
    } as never);
    const r = await svc.list({ page: 1, limit: 20 });
    expect(r.items.length).toBe(1);
  });

  it('list without phone', async () => {
    repo.findPaginated.mockResolvedValueOnce({
      items: [build(false)], total: 1, page: 1, limit: 20, totalPages: 1,
    } as never);
    const r = await svc.list({ page: 1, limit: 20 });
    expect(r.items[0]?.to).toBe('');
  });

  it('retry not found', async () => {
    await expect(svc.retry(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });

  it('retry ok', async () => {
    const e = build();
    e.queue();
    e.startSending('sslwireless');
    const { DeliveryFailureReasonVO } = await import('../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js');
    e.fail(DeliveryFailureReasonVO.timeout());
    repo.findByIdVO.mockResolvedValueOnce(e);
    const r = await svc.retry(FIXED_NOTIFICATION_ID, 'actor');
    expect(r.success).toBe(true);
  });
  it('cancel not found', async () => {
    await expect(svc.cancel(FIXED_NOTIFICATION_ID, 'actor')).rejects.toThrow();
  });

  it('cancel ok with phone', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build(true));
    await svc.cancel(FIXED_NOTIFICATION_ID, 'actor');
  });

  it('cancel ok without phone', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build(false));
    await svc.cancel(FIXED_NOTIFICATION_ID, 'actor');
  });
});
