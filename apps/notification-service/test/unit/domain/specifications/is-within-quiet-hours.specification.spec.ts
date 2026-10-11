import { describe, it, expect } from '@jest/globals';
import { IsWithinQuietHoursSpecification } from '../../../../src/module/domain/specifications/is-within-quiet-hours.specification.js';
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

function buildEntity(priority = NotificationPriorityVO.normal()): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority,
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

describe('IsWithinQuietHoursSpecification', () => {
  const spec = new IsWithinQuietHoursSpecification();
  const basePreference = {
    quietHoursEnabled: true,
    quietHoursStart: 22,
    quietHoursEnd: 8,
    isInQuietHours: (h: number) => h >= 22 || h < 8,
  } as never;

  it('true when in quiet hours', () => {
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      ctx: { currentHour: 23 },
    })).toBe(true);
  });

  it('false when disabled', () => {
    const p = { ...basePreference, quietHoursEnabled: false } as never;
    expect(spec.isSatisfiedBy({ preference: p, ctx: { currentHour: 23 } })).toBe(false);
  });

  it('false when outside range', () => {
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      ctx: { currentHour: 12 },
    })).toBe(false);
  });

  it('false for critical notification (bypass)', () => {
    const e = buildEntity(NotificationPriorityVO.critical());
    expect(spec.isSatisfiedBy({
      preference: basePreference,
      notification: e,
      ctx: { currentHour: 23 },
    })).toBe(false);
  });

  it('explain returns message when in quiet hours', () => {
    expect(spec.explain({
      preference: basePreference,
      ctx: { currentHour: 23 },
    })).toMatch(/quiet/i);
  });

  it('explain returns null when not in quiet hours', () => {
    expect(spec.explain({
      preference: basePreference,
      ctx: { currentHour: 12 },
    })).toBeNull();
  });
});
