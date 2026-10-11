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

function build(overrides: {
  type?: NotificationTypeVO;
  category?: NotificationCategoryVO;
  priority?: NotificationPriorityVO;
} = {}): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: overrides.type ?? NotificationTypeVO.transactional(),
      category: overrides.category ?? NotificationCategoryVO.order(),
      channel: ch,
      priority: overrides.priority ?? NotificationPriorityVO.normal(),
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

describe('CanSendNotificationSpecification', () => {
  const spec = new CanSendNotificationSpecification();

  it('true for pending notification', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(true);
  });

  it('false for cancelled', () => {
    const e = build();
    e.cancel();
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('explain returns reason for cancelled', () => {
    const e = build();
    e.cancel();
    expect(spec.explain({ notification: e })).toMatch(/status/);
  });

  it('false when category disabled by preference', () => {
    const e = build();
    const preference = {
      isCategoryEnabled: () => false,
      isChannelEnabled: () => true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ notification: e, ctx: { preference } })).toBe(false);
  });

  it('false when channel disabled by preference', () => {
    const e = build();
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => false,
      isInQuietHours: () => false,
    } as never;
    expect(spec.isSatisfiedBy({ notification: e, ctx: { preference } })).toBe(false);
  });

  it('false within quiet hours for non-transactional non-critical', () => {
    const e = build({
      type: NotificationTypeVO.marketing(),
      category: NotificationCategoryVO.marketing(),
      priority: NotificationPriorityVO.normal(),
    });
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

  it('true for critical priority during quiet hours (bypass)', () => {
    const e = build({
      type: NotificationTypeVO.marketing(),
      category: NotificationCategoryVO.marketing(),
      priority: NotificationPriorityVO.critical(),
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

  it('true for transactional during quiet hours (bypass)', () => {
    const e = build({
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      priority: NotificationPriorityVO.normal(),
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

  it('true for security during quiet hours (bypass)', () => {
    const e = build({
      type: NotificationTypeVO.security(),
      category: NotificationCategoryVO.security(),
      priority: NotificationPriorityVO.normal(),
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

  it('explain returns null for valid notification', () => {
    expect(spec.explain({ notification: build() })).toBeNull();
  });

  it('explain returns category reason', () => {
    const e = build();
    const preference = {
      isCategoryEnabled: () => false,
      isChannelEnabled: () => true,
      isInQuietHours: () => false,
    } as never;
    expect(spec.explain({ notification: e, ctx: { preference } })).toMatch(/category/);
  });

  it('explain returns channel reason', () => {
    const e = build();
    const preference = {
      isCategoryEnabled: () => true,
      isChannelEnabled: () => false,
      isInQuietHours: () => false,
    } as never;
    expect(spec.explain({ notification: e, ctx: { preference } })).toMatch(/channel/);
  });
});
