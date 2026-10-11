/**
 * Full spec coverage — all branches (fixed expiry test)
 */
import { describe, it, expect } from '@jest/globals';
import { CanSendNotificationSpecification } from '../../../../src/module/domain/specifications/can-send-notification.specification.js';
import { CanRetryDeliverySpecification } from '../../../../src/module/domain/specifications/can-retry-delivery.specification.js';
import { ShouldSendViaChannelSpecification } from '../../../../src/module/domain/specifications/should-send-via-channel.specification.js';
import { IsWithinQuietHoursSpecification } from '../../../../src/module/domain/specifications/is-within-quiet-hours.specification.js';
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

function build(opts: { withExpiry?: boolean } = {}): NotificationEntity {
  const ch = NotificationChannelVO.email();
  const props: Record<string, unknown> = {
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
  };
  if (opts.withExpiry) {
    props['expiresAt'] = new Date(Date.now() + 1000).toISOString();
  }
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: props as never,
  });
}

describe('CanSendNotificationSpecification full', () => {
  const spec = new CanSendNotificationSpecification();

  it('explain satisfied → null', () => {
    expect(spec.explain({ notification: build() })).toBeNull();
  });

  it('explain category disabled', () => {
    const preference = {
      isCategoryEnabled: () => false,
      isChannelEnabled: () => true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.explain({ notification: build(), ctx: { preference } })).toMatch(/category/);
  });

  it('explain channel disabled', () => {
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => false,
      isInQuietHours: () => false,
    } as never;
    expect(spec.explain({ notification: build(), ctx: { preference } })).toMatch(/channel/);
  });

  it('explain quiet hours (marketing type)', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
      id: FIXED_NOTIFICATION_ID,
      now: new Date().toISOString(),
      props: {
        type: NotificationTypeVO.marketing(),
        category: NotificationCategoryVO.marketing(),
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
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => true,
      isInQuietHours: () => true,
    } as never;
    expect(spec.explain({ notification: e, ctx: { preference, currentHour: 23 } })).toMatch(/quiet/);
  });
});

describe('CanRetryDeliverySpecification full', () => {
  const spec = new CanRetryDeliverySpecification();

  it('true for retryable failure', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    expect(spec.isSatisfiedBy({ notification: e })).toBe(true);
  });

  it('false for non-retryable failure', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('explain non-failed status', () => {
    expect(spec.explain({ notification: build() })).toMatch(/not failed/);
  });

  it('explain non-retryable failure', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    expect(spec.explain({ notification: e })).toMatch(/retryable/);
  });

  it('false when expired (with expiresAt set)', () => {
    const e = build({ withExpiry: true });
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    expect(spec.isSatisfiedBy({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 10 * 86_400_000) },
    })).toBe(false);
  });

  it('explain when retry limit reached', () => {
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
    expect(spec.explain({ notification: e })).toMatch(/limit/);
  });
});

describe('IsWithinQuietHoursSpecification full', () => {
  const spec = new IsWithinQuietHoursSpecification();

  it('true in quiet hours', () => {
    const p = {
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      isInQuietHours: (h: number) => h >= 22 || h < 8,
    } as never;
    expect(spec.isSatisfiedBy({ preference: p, ctx: { currentHour: 23 } })).toBe(true);
  });

  it('false when disabled', () => {
    const p = { quietHoursEnabled: false } as never;
    expect(spec.isSatisfiedBy({ preference: p, ctx: { currentHour: 23 } })).toBe(false);
  });

  it('false outside range', () => {
    const p = {
      quietHoursEnabled: true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ preference: p, ctx: { currentHour: 12 } })).toBe(false);
  });

  it('critical bypasses even in quiet hours', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
      id: FIXED_NOTIFICATION_ID,
      now: new Date().toISOString(),
      props: {
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.order(),
        channel: ch,
        priority: NotificationPriorityVO.critical(),
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
    const p = {
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      isInQuietHours: () => true,
    } as never;
    expect(spec.isSatisfiedBy({
      preference: p,
      notification: e,
      ctx: { currentHour: 23 },
    })).toBe(false);
  });

  it('explain returns message when in quiet', () => {
    const p = {
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      isInQuietHours: () => true,
    } as never;
    expect(spec.explain({ preference: p, ctx: { currentHour: 23 } })).toMatch(/quiet/);
  });

  it('explain returns null when not in quiet', () => {
    const p = { quietHoursEnabled: false } as never;
    expect(spec.explain({ preference: p, ctx: { currentHour: 23 } })).toBeNull();
  });
});

describe('ShouldSendViaChannelSpecification full', () => {
  const spec = new ShouldSendViaChannelSpecification();

  it('true email with email', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
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
          email: { value: 'x@y.com' } as never,
        }),
      },
    });
    expect(spec.isSatisfiedBy({ notification: e })).toBe(true);
  });

  it('explain satisfied null', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
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
          email: { value: 'x@y.com' } as never,
        }),
      },
    });
    expect(spec.explain({ notification: e })).toBeNull();
  });
});
