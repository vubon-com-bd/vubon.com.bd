import { describe, it, expect } from '@jest/globals';
import { CanRetryDeliverySpecification } from '../../../../src/module/domain/specifications/can-retry-delivery.specification.js';
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

describe('CanRetryDeliverySpecification', () => {
  const spec = new CanRetryDeliverySpecification();

  it('false for pending', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(false);
  });

  it('true for failed retryable under limit', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    expect(spec.isSatisfiedBy({ notification: e })).toBe(true);
  });

  it('false for failed non-retryable', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('false when retry limit reached', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    // simulate 3 attempts via loop
    for (let i = 0; i < 3; i++) {
      try {
        e.retry();
        e.queue();
        e.startSending('smtp');
        e.fail(DeliveryFailureReasonVO.timeout());
      } catch { /* ignore */ }
    }
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('explain returns reason', () => {
    const e = build();
    expect(spec.explain({ notification: e })).toMatch(/status/);
  });
});
