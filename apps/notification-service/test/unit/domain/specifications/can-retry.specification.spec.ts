import { CanRetrySpecification } from '@domain/specifications/can-retry.specification.js';
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
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const make = (status: any = NotificationStatusVO.failed()) =>
  NotificationEntity.reconstitute({
    id: IDS.notificationId, createdAt: NOW, updatedAt: NOW,
    props: {
      vo: NotificationVO.create({
        id: NotificationIdVO.create(IDS.notificationId),
        userId: UserIdVO.create(IDS.userId),
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        channel: NotificationChannelVO.email(),
        priority: NotificationPriorityVO.normal(),
        status,
        subject: NotificationSubjectVO.create('S'),
        body: NotificationBodyVO.create('B'),
        data: NotificationDataVO.create({}),
      }),
      content: NotificationContentVO.create({
        subject: NotificationSubjectVO.create('S'),
        body: NotificationBodyVO.create('B'),
        data: NotificationDataVO.create({}),
      }),
      recipients: [
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.email(),
          email: EmailAddressVO.create('u@example.com'),
        }),
      ],
      actions: [], attempts: [],
    },
  });

describe('CanRetrySpecification', () => {
  const spec = CanRetrySpecification.strict();

  it('satisfied for failed notification', () => {
    expect(spec.isSatisfiedBy({ notification: make() })).toBe(true);
  });

  it('not satisfied when not failed', () => {
    const n = make(NotificationStatusVO.draft());
    expect(spec.isSatisfiedBy({ notification: n })).toBe(false);
    expect(spec.explain({ notification: n })).toContain('not failed');
  });

  it('not satisfied for non-retryable error', () => {
    const n = make();
    const err = DeliveryErrorVO.create({ reason: 'invalid_address', message: 'x', retryable: true });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { error: err } })).toBe(false);
  });

  it('not satisfied for error.retryable=false', () => {
    const n = make();
    const err = DeliveryErrorVO.create({ reason: 'timeout', message: 'x', retryable: false });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { error: err } })).toBe(false);
  });

  it('not satisfied outside retry window', () => {
    const n = make();
    const veryOld = new Date(Date.now() - 365 * 24 * 3600 * 1000).toISOString();
    // Use createdAt override via reconstitute - actually uses updatedAt for age
    const n2 = NotificationEntity.reconstitute({
      id: IDS.notificationId, createdAt: veryOld, updatedAt: veryOld,
      props: {
        vo: NotificationVO.create({
          id: NotificationIdVO.create(IDS.notificationId),
          userId: UserIdVO.create(IDS.userId),
          type: NotificationTypeVO.transactional(),
          category: NotificationCategoryVO.create('order'),
          channel: NotificationChannelVO.email(),
          priority: NotificationPriorityVO.normal(),
          status: NotificationStatusVO.failed(),
          subject: NotificationSubjectVO.create('S'),
          body: NotificationBodyVO.create('B'),
          data: NotificationDataVO.create({}),
        }),
        content: NotificationContentVO.create({
          subject: NotificationSubjectVO.create('S'),
          body: NotificationBodyVO.create('B'),
          data: NotificationDataVO.create({}),
        }),
        recipients: [
          NotificationRecipientVO.create({
            userId: UserIdVO.create(IDS.userId),
            channel: NotificationChannelVO.email(),
            email: EmailAddressVO.create('u@example.com'),
          }),
        ],
        actions: [], attempts: [],
      },
    });
    expect(spec.isSatisfiedBy({ notification: n2, ctx: { retryWindowMinutes: 60 } })).toBe(false);
  });
});
