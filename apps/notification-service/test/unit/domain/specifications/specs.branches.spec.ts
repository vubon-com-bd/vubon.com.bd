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
import { EmailAddressVO } from '../../../../src/module/domain/value-objects/primitives/email-address.vo.js';
import { DeliveryFailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function build(opts: {
  withExpiry?: boolean;
  withEmail?: boolean;
  type?: 'transactional' | 'marketing';
} = {}): NotificationEntity {
  const ch = NotificationChannelVO.email();
  const props: Record<string, unknown> = {
    type: opts.type === 'marketing'
      ? NotificationTypeVO.marketing()
      : NotificationTypeVO.transactional(),
    category: opts.type === 'marketing'
      ? NotificationCategoryVO.marketing()
      : NotificationCategoryVO.order(),
    channel: ch,
    priority: NotificationPriorityVO.normal(),
    content: NotificationContentVO.create({
      title: NotificationTitleVO.create('T'),
      body: NotificationBodyVO.create('B'),
    }),
    recipient: NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute(FIXED_USER_ID),
      channel: ch,
      email: opts.withEmail === false
        ? undefined
        : EmailAddressVO.create('x@y.com'),
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

describe('CanSendNotificationSpecification branches', () => {
  const spec = new CanSendNotificationSpecification();

  it('satisfied pending', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(true);
  });

  it('not satisfied cancelled', () => {
    const e = build();
    e.cancel();
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('not satisfied expired', () => {
    const e = build({ withExpiry: true });
    expect(spec.isSatisfiedBy({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 100 * 86_400_000) },
    })).toBe(false);
  });

  it('not satisfied category disabled', () => {
    const preference = {
      isCategoryEnabled: () => false,
      isChannelEnabled: () => true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ notification: build(), ctx: { preference } })).toBe(false);
  });

  it('not satisfied channel disabled', () => {
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => false,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ notification: build(), ctx: { preference } })).toBe(false);
  });

  it('not satisfied quiet hours non-critical', () => {
    const e = build({ type: 'marketing' });
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => true,
      isInQuietHours: () => true,
    } as never;
    expect(spec.isSatisfiedBy({
      notification: e,
      ctx: { preference, currentHour: 23 },
    })).toBe(false);
  });

  it('critical bypasses quiet hours', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
      id: FIXED_NOTIFICATION_ID,
      now: new Date().toISOString(),
      props: {
        type: NotificationTypeVO.marketing(),
        category: NotificationCategoryVO.marketing(),
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
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => true,
      isInQuietHours: () => true,
    } as never;
    expect(spec.isSatisfiedBy({
      notification: e,
      ctx: { preference, currentHour: 23 },
    })).toBe(true);
  });

  it('explain satisfied null', () => {
    expect(spec.explain({ notification: build() })).toBeNull();
  });

  it('explain status', () => {
    const e = build();
    e.cancel();
    expect(spec.explain({ notification: e })).toMatch(/status/);
  });

  it('explain expired', () => {
    const e = build({ withExpiry: true });
    expect(spec.explain({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 100 * 86_400_000) },
    })).toMatch(/expired/);
  });

  it('explain category', () => {
    const preference = {
      isCategoryEnabled: () => false,
      isChannelEnabled: () => true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.explain({ notification: build(), ctx: { preference } })).toMatch(/category/);
  });

  it('explain channel', () => {
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => false,
      isInQuietHours: () => false,
    } as never;
    expect(spec.explain({ notification: build(), ctx: { preference } })).toMatch(/channel/);
  });

  it('explain quiet hours', () => {
    const e = build({ type: 'marketing' });
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => true,
      isInQuietHours: () => true,
    } as never;
    expect(spec.explain({
      notification: e,
      ctx: { preference, currentHour: 23 },
    })).toMatch(/quiet/);
  });
});

describe('CanRetryDeliverySpecification branches', () => {
  const spec = new CanRetryDeliverySpecification();

  it('not satisfied pending (not failed)', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(false);
  });

  it('satisfied retryable failure', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    expect(spec.isSatisfiedBy({ notification: e })).toBe(true);
  });

  it('not satisfied non-retryable failure', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('not satisfied expired', () => {
    const e = build({ withExpiry: true });
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    expect(spec.isSatisfiedBy({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 100 * 86_400_000) },
    })).toBe(false);
  });

  it('explain not-failed', () => {
    expect(spec.explain({ notification: build() })).toMatch(/not failed/);
  });

  it('explain non-retryable', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.invalidAddress());
    expect(spec.explain({ notification: e })).toMatch(/retryable/);
  });

  it('explain retry limit reached', () => {
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

  it('explain expired', () => {
    const e = build({ withExpiry: true });
    e.queue();
    e.startSending('smtp');
    e.fail(DeliveryFailureReasonVO.timeout());
    expect(spec.explain({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 100 * 86_400_000) },
    })).toMatch(/expired/);
  });
});

describe('IsWithinQuietHoursSpecification branches', () => {
  const spec = new IsWithinQuietHoursSpecification();

  const basePreference = {
    quietHoursEnabled: true,
    quietHoursStart: 22,
    quietHoursEnd: 8,
    isInQuietHours: (h: number) => h >= 22 || h < 8,
  } as never;

  it('true within quiet', () => {
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      ctx: { currentHour: 23 },
    })).toBe(true);
  });

  it('false disabled', () => {
    expect(spec.isSatisfiedBy({
      preference: { quietHoursEnabled: false } as never,
      ctx: { currentHour: 23 },
    })).toBe(false);
  });

  it('false outside range', () => {
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      ctx: { currentHour: 12 },
    })).toBe(false);
  });

  it('notification critical bypasses', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
      id: FIXED_NOTIFICATION_ID,
      now: new Date().toISOString(),
      props: {
        type: NotificationTypeVO.marketing(),
        category: NotificationCategoryVO.marketing(),
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
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      notification: e,
      ctx: { currentHour: 23 },
    })).toBe(false);
  });

  it('security type bypasses', () => {
    const ch = NotificationChannelVO.email();
    const e = NotificationEntity.create({
      id: FIXED_NOTIFICATION_ID,
      now: new Date().toISOString(),
      props: {
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.security(),
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
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      notification: e,
      ctx: { currentHour: 23 },
    })).toBe(false);
  });

  it('explain within quiet', () => {
    expect(spec.explain({
      preference: basePreference,
      ctx: { currentHour: 23 },
    })).toMatch(/quiet/);
  });

  it('explain null when not in quiet', () => {
    expect(spec.explain({
      preference: basePreference,
      ctx: { currentHour: 12 },
    })).toBeNull();
  });
});

describe('ShouldSendViaChannelSpecification branches', () => {
  const spec = new ShouldSendViaChannelSpecification();

  it('email without email', () => {
    const e = build({ withEmail: false });
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
    expect(spec.explain({ notification: e })).toMatch(/email/);
  });

  it('push requires device', () => {
    const ch = NotificationChannelVO.push();
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
          deviceToken: { value: 'tk-abcdefghijklmnop' } as never,
        }),
      },
    });
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
    expect(spec.explain({ notification: e })).toMatch(/device/);
  });

  it('blocked device fails', () => {
    const ch = NotificationChannelVO.push();
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
          deviceToken: { value: 'tk-abcdefghijklmnop' } as never,
        }),
      },
    });
    const device = { canReceivePush: () => false, status: { value: 'blocked' } } as never;
    expect(spec.isSatisfiedBy({ notification: e, ctx: { device } })).toBe(false);
    expect(spec.explain({ notification: e, ctx: { device } })).toMatch(/blocked/);
  });

  it('preference disabled', () => {
    const preference = { isChannelEnabled: () => false } as never;
    expect(spec.isSatisfiedBy({ notification: build(), ctx: { preference } })).toBe(false);
    expect(spec.explain({ notification: build(), ctx: { preference } })).toMatch(/disabled/);
  });

  it('satisfied full', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(true);
    expect(spec.explain({ notification: build() })).toBeNull();
  });

  it('phone required path', () => {
    const ch = NotificationChannelVO.sms();
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
        }),
      },
    });
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
    expect(spec.explain({ notification: e })).toMatch(/phone/);
  });
});
