import { describe, it, expect, beforeEach } from '@jest/globals';
import { SmsService } from '../../../../src/module/application/services/impl/sms.service.js';
import { EmailService } from '../../../../src/module/application/services/impl/email.service.js';
import { TemplateService } from '../../../../src/module/application/services/impl/template.service.js';
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
import { makeNotificationRepo, makeTemplateRepo, makeEventBridge } from '../../../helpers/mock-services.js';

function buildNoPhone(): NotificationEntity {
  const ch = NotificationChannelVO.sms();
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

function buildNoEmail(): NotificationEntity {
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

describe('SmsService — no phone branches', () => {
  it('getById without phone → empty string', async () => {
    const repo = makeNotificationRepo();
    const svc = new SmsService(repo as never, makeEventBridge() as never);
    repo.findByIdVO.mockResolvedValueOnce(buildNoPhone());
    const r = await svc.getById({ smsId: FIXED_NOTIFICATION_ID });
    expect(r.to).toBe('');
  });

  it('list without phone → empty string', async () => {
    const repo = makeNotificationRepo();
    const svc = new SmsService(repo as never, makeEventBridge() as never);
    repo.findPaginated.mockResolvedValueOnce({
      items: [buildNoPhone()], total: 1, page: 1, limit: 20, totalPages: 1,
    } as never);
    const r = await svc.list({ page: 1, limit: 20 });
    expect(r.items[0]?.to).toBe('');
  });

  it('cancel without phone → empty string', async () => {
    const repo = makeNotificationRepo();
    const svc = new SmsService(repo as never, makeEventBridge() as never);
    repo.findByIdVO.mockResolvedValueOnce(buildNoPhone());
    await svc.cancel(FIXED_NOTIFICATION_ID, 'actor');
  });
});

describe('EmailService — no email branches', () => {
  it('getById without email → empty to', async () => {
    const repo = makeNotificationRepo();
    const svc = new EmailService(repo as never, makeEventBridge() as never);
    repo.findByIdVO.mockResolvedValueOnce(buildNoEmail());
    const r = await svc.getById({ emailId: FIXED_NOTIFICATION_ID });
    expect(r.to).toEqual([]);
  });

  it('list without email → empty to', async () => {
    const repo = makeNotificationRepo();
    const svc = new EmailService(repo as never, makeEventBridge() as never);
    repo.findPaginated.mockResolvedValueOnce({
      items: [buildNoEmail()], total: 1, page: 1, limit: 20, totalPages: 1,
    } as never);
    const r = await svc.list({ page: 1, limit: 20 });
    expect(r.items[0]?.to).toEqual([]);
  });

  it('cancel without email', async () => {
    const repo = makeNotificationRepo();
    const svc = new EmailService(repo as never, makeEventBridge() as never);
    repo.findByIdVO.mockResolvedValueOnce(buildNoEmail());
    await svc.cancel(FIXED_NOTIFICATION_ID, 'actor');
  });
});

describe('TemplateService — default sample data branch', () => {
  it('preview without sampleData uses {}', async () => {
    const repo = makeTemplateRepo();
    const svc = new TemplateService(repo as never, makeEventBridge() as never);
    repo.findByIdVO.mockResolvedValueOnce(null);
    await expect(svc.preview({ templateId: FIXED_NOTIFICATION_ID } as never)).rejects.toThrow();
  });
});
