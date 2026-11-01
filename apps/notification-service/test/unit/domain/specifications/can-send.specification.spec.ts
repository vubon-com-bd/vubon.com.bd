import { CanSendSpecification } from '@domain/specifications/can-send.specification.js';
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
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();

const make = (o: any = {}) => {
  const vo = NotificationVO.create({
    id: NotificationIdVO.create(IDS.notificationId),
    userId: UserIdVO.create(IDS.userId),
    type: NotificationTypeVO.transactional(),
    category: NotificationCategoryVO.create('order'),
    channel: NotificationChannelVO.email(),
    priority: NotificationPriorityVO.normal(),
    status: NotificationStatusVO.draft(),
    subject: NotificationSubjectVO.create('S'),
    body: NotificationBodyVO.create('B'),
    data: NotificationDataVO.create({}),
    ...o.vo,
  });
  return NotificationEntity.reconstitute({
    id: IDS.notificationId, createdAt: NOW, updatedAt: NOW,
    props: {
      vo,
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
      ...o.props,
    },
  });
};

describe('CanSendSpecification', () => {
  const spec = CanSendSpecification.strict();

  it('satisfied for draft', () => {
    expect(spec.isSatisfiedBy({ notification: make() })).toBe(true);
  });

  it('explain null when satisfiable', () => {
    expect(spec.explain({ notification: make() })).toBeNull();
  });

  it('not satisfied when terminal', () => {
    const n = make({
      vo: { status: NotificationStatusVO.delivered() },
      props: { sentAt: NOW, deliveredAt: NOW },
    });
    expect(spec.isSatisfiedBy({ notification: n })).toBe(false);
    expect(spec.explain({ notification: n })).toContain('status');
  });

  it('not satisfied when expired by date', () => {
    const n = make({ props: { expiresAt: '2020-01-01T00:00:00Z' } });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { now: new Date() } })).toBe(false);
    expect(spec.explain({ notification: n, ctx: { now: new Date() } })).toContain('expired');
  });

  it('not satisfied when no available channel', () => {
    expect(
      spec.isSatisfiedBy({ notification: make(), ctx: { hasAvailableChannel: false } }),
    ).toBe(false);
  });
});
