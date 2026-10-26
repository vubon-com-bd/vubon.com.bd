import { NotificationMapper } from '@application/mappers/notification.mapper.js';
import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';
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
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildVO() {
  const data = NotificationDataVO.create({ k: 'v' });
  return NotificationVO.create({
    id: NotificationIdVO.create(IDS.notificationId),
    userId: UserIdVO.create(IDS.userId),
    type: NotificationTypeVO.transactional(),
    category: NotificationCategoryVO.create('system'),
    channel: NotificationChannelVO.email(),
    priority: NotificationPriorityVO.normal(),
    status: NotificationStatusVO.pending(),
    subject: NotificationSubjectVO.create('Hi'),
    body: NotificationBodyVO.create('Body'),
    data,
  });
}

function buildContent() {
  return NotificationContentVO.create({
    subject: NotificationSubjectVO.create('Hi'),
    body: NotificationBodyVO.create('Body'),
    data: NotificationDataVO.create({}),
  });
}

function buildRecipient() {
  return NotificationRecipientVO.create({
    userId: UserIdVO.create(IDS.userId),
    channel: NotificationChannelVO.email(),
    email: EmailAddressVO.create('a@b.com'),
  });
}

function buildNotification(opts: { withDelivery?: boolean } = {}) {
  if (opts.withDelivery) {
    const delivery = NotificationDeliveryVO.create({
      status: DeliveryStatusVO.sent(),
      attemptCount: 1,
      maxAttempts: 3,
      sentAt: DATES.now,
    });
    return NotificationEntity.reconstitute({
      id: IDS.notificationId,
      createdAt: DATES.now,
      updatedAt: DATES.now,
      props: {
        vo: buildVO(),
        content: buildContent(),
        recipients: [buildRecipient()],
        actions: [],
        attempts: [],
        delivery,
        sentAt: DATES.now,
      },
    });
  }
  return NotificationEntity.create({
    id: NotificationIdVO.create(IDS.notificationId),
    vo: buildVO(),
    content: buildContent(),
    recipients: [buildRecipient()],
    now: DATES.now,
  });
}

describe('NotificationMapper', () => {
  it('toResponse maps core fields', () => {
    const r = NotificationMapper.toResponse(buildNotification());
    expect(r.id).toBe(IDS.notificationId);
    expect(r.userId).toBe(IDS.userId);
    expect(r.title).toBe('Hi');
    expect(r.body).toBe('Body');
    expect(r.createdAt).toBeTruthy();
  });

  it('toResponse with delivery (reconstitute path)', () => {
    const r = NotificationMapper.toResponse(buildNotification({ withDelivery: true }));
    expect(r.delivery).toBeDefined();
    expect(r.delivery!.attemptCount).toBe(1);
  });

  it('toResponse without delivery', () => {
    const r = NotificationMapper.toResponse(buildNotification());
    expect(r.delivery).toBeUndefined();
  });

  it('toPublicResponse hides internal fields', () => {
    const r = NotificationMapper.toPublicResponse(buildNotification());
    expect(r.id).toBe(IDS.notificationId);
    expect(r.title).toBe('Hi');
    expect(r.isRead).toBe(false);
  });

  it('toSummary', () => {
    const r = NotificationMapper.toSummary(buildNotification());
    expect(r.id).toBe(IDS.notificationId);
    expect(r.isRead).toBe(false);
  });

  it('toListResponse', () => {
    const r = NotificationMapper.toListResponse(
      [buildNotification(), buildNotification()],
      10, 1, 5,
    );
    expect(r.items.length).toBe(2);
    expect(r.totalPages).toBe(2);
  });

  it('toDetail returns empty children', () => {
    const r = NotificationMapper.toDetail(buildNotification());
    expect(r.notification.id).toBe(IDS.notificationId);
    expect(r.recipients.length).toBe(0);
    expect(r.attempts.length).toBe(0);
  });

  it('toDetailWithChildren with empty arrays', () => {
    const r = NotificationMapper.toDetailWithChildren(buildNotification(), [], []);
    expect(r.recipients.length).toBe(0);
    expect(r.attempts.length).toBe(0);
  });

  it('toStatsResponse', () => {
    const r = NotificationMapper.toStatsResponse({
      total: 10, unreadCount: 3,
      byStatus: { sent: 5 },
      byChannel: { email: 5 },
      byPriority: { normal: 5 },
    });
    expect(r.total).toBe(10);
    expect(r.unreadCount).toBe(3);
  });
});
