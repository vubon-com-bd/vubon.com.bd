import { describe, it, expect } from '@jest/globals';
import { CanSendNotificationSpecification } from '../../../../src/module/domain/specifications/can-send-notification.specification.js';
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

function build(opts: {
  withExpiry?: boolean;
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

describe('CanSendNotificationSpecification deeper', () => {
  const spec = new CanSendNotificationSpecification();

  it('true for pending', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(true);
  });

  it('false for cancelled', () => {
    const e = build();
    e.cancel();
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('false when expired (with expiresAt set)', () => {
    const e = build({ withExpiry: true });
    expect(spec.isSatisfiedBy({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 10 * 86_400_000) },
    })).toBe(false);
  });

  it('false when category disabled', () => {
    const preference = {
      isCategoryEnabled: () => false,
      isChannelEnabled: () => true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ notification: build(), ctx: { preference } })).toBe(false);
  });

  it('false when channel disabled', () => {
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => false,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ notification: build(), ctx: { preference } })).toBe(false);
  });

  it('false in quiet hours for marketing type', () => {
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

  it('true when critical bypasses quiet hours', () => {
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

  it('explain returns null when satisfied', () => {
    expect(spec.explain({ notification: build() })).toBeNull();
  });

  it('explain returns reason for cancelled', () => {
    const e = build();
    e.cancel();
    expect(spec.explain({ notification: e })).toBeDefined();
  });

  it('explain for expired (with expiresAt set)', () => {
    const e = build({ withExpiry: true });
    expect(spec.explain({
      notification: e,
      ctx: { referenceDate: new Date(Date.now() + 10 * 86_400_000) },
    })).toMatch(/expired/);
  });
});
