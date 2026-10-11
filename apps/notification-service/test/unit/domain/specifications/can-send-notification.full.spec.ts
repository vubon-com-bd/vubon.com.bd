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

function build(type = NotificationTypeVO.transactional(), priority = NotificationPriorityVO.normal(), expiresInPast = false): NotificationEntity {
  const ch = NotificationChannelVO.email();
  const now = expiresInPast
    ? new Date(Date.now() - 20 * 86400000).toISOString()
    : new Date().toISOString();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now,
    props: {
      type,
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
      expiresAt: expiresInPast
        ? new Date(Date.now() - 86400000).toISOString()
        : new Date(Date.now() + 10 * 86400000).toISOString(),
    },
  });
}

function makePref(overrides: { categoryEnabled?: boolean; channelEnabled?: boolean; inQuiet?: boolean } = {}) {
  return {
    isCategoryEnabled: () => overrides.categoryEnabled ?? true,
    isChannelEnabled: () => overrides.channelEnabled ?? true,
    isInQuietHours: () => overrides.inQuiet ?? false,
  } as never;
}

describe('CanSendNotificationSpecification — branch coverage', () => {
  const spec = new CanSendNotificationSpecification();

  // isSatisfiedBy
  it('TRUE pending no ctx', () => {
    expect(spec.isSatisfiedBy({ notification: build() })).toBe(true);
  });

  it('FALSE cancelled status', () => {
    const e = build();
    e.cancel();
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('FALSE delivered status', () => {
    const e = build();
    e.queue();
    e.startSending('smtp');
    e.markSent();
    e.markDelivered();
    expect(spec.isSatisfiedBy({ notification: e })).toBe(false);
  });

  it('FALSE expired (referenceDate)', () => {
    expect(spec.isSatisfiedBy({
      notification: build(NotificationTypeVO.transactional(), NotificationPriorityVO.normal(), true),
      ctx: { referenceDate: new Date() },
    })).toBe(false);
  });

  it('FALSE category disabled by preference', () => {
    expect(spec.isSatisfiedBy({
      notification: build(),
      ctx: { preference: makePref({ categoryEnabled: false }) },
    })).toBe(false);
  });

  it('FALSE channel disabled by preference', () => {
    expect(spec.isSatisfiedBy({
      notification: build(),
      ctx: { preference: makePref({ channelEnabled: false }) },
    })).toBe(false);
  });

  it('FALSE quiet hours non-critical (marketing type)', () => {
    expect(spec.isSatisfiedBy({
      notification: build(NotificationTypeVO.marketing()),
      ctx: { preference: makePref({ inQuiet: true }), currentHour: 23 },
    })).toBe(false);
  });

  it('TRUE critical bypasses quiet hours', () => {
    expect(spec.isSatisfiedBy({
      notification: build(NotificationTypeVO.transactional(), NotificationPriorityVO.critical()),
      ctx: { preference: makePref({ inQuiet: true }), currentHour: 23 },
    })).toBe(true);
  });

  it('TRUE security bypasses quiet hours', () => {
    expect(spec.isSatisfiedBy({
      notification: build(NotificationTypeVO.security()),
      ctx: { preference: makePref({ inQuiet: true }), currentHour: 23 },
    })).toBe(true);
  });

  it('TRUE preference undefined', () => {
    expect(spec.isSatisfiedBy({ notification: build(), ctx: {} })).toBe(true);
  });

  it('TRUE preference null', () => {
    expect(spec.isSatisfiedBy({ notification: build(), ctx: { preference: null } })).toBe(true);
  });

  it('TRUE currentHour undefined', () => {
    expect(spec.isSatisfiedBy({
      notification: build(),
      ctx: { preference: makePref({ inQuiet: true }) },
    })).toBe(true);
  });

  // explain
  it('explain null when satisfied', () => {
    expect(spec.explain({ notification: build() })).toBeNull();
  });

  it('explain status reason', () => {
    const e = build();
    e.cancel();
    expect(spec.explain({ notification: e })).toMatch(/status/);
  });

  it('explain expired reason', () => {
    expect(spec.explain({
      notification: build(NotificationTypeVO.transactional(), NotificationPriorityVO.normal(), true),
      ctx: { referenceDate: new Date() },
    })).toMatch(/expired/);
  });

  it('explain category reason', () => {
    expect(spec.explain({
      notification: build(),
      ctx: { preference: makePref({ categoryEnabled: false }) },
    })).toMatch(/category/);
  });

  it('explain channel reason', () => {
    expect(spec.explain({
      notification: build(),
      ctx: { preference: makePref({ channelEnabled: false }) },
    })).toMatch(/channel/);
  });

  it('explain quiet hours reason', () => {
    expect(spec.explain({
      notification: build(NotificationTypeVO.marketing()),
      ctx: { preference: makePref({ inQuiet: true }), currentHour: 23 },
    })).toMatch(/quiet/);
  });

  it('explain null when preference undefined', () => {
    expect(spec.explain({ notification: build(), ctx: {} })).toBeNull();
  });
});
