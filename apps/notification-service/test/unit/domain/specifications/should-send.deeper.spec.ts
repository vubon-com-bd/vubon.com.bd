import { describe, it, expect } from '@jest/globals';
import { ShouldSendViaChannelSpecification } from '../../../../src/module/domain/specifications/should-send-via-channel.specification.js';
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

function buildEmail(hasEmail: boolean): NotificationEntity {
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
        email: hasEmail ? { value: 'x@y.com' } as never : undefined,
      }),
    },
  });
}

function buildPush(hasToken: boolean): NotificationEntity {
  const ch = NotificationChannelVO.push();
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
        deviceToken: hasToken ? { value: 'tk-abcdefghijklmnop' } as never : undefined,
      }),
    },
  });
}

describe('ShouldSendViaChannelSpecification deeper', () => {
  const spec = new ShouldSendViaChannelSpecification();

  it('push without device fails', () => {
    expect(spec.isSatisfiedBy({ notification: buildPush(true) })).toBe(false);
  });

  it('push with active device', () => {
    const device = { canReceivePush: () => true, status: { value: 'active' } } as never;
    expect(spec.isSatisfiedBy({
      notification: buildPush(true),
      ctx: { device },
    })).toBe(true);
  });

  it('push with blocked device', () => {
    const device = { canReceivePush: () => false, status: { value: 'blocked' } } as never;
    expect(spec.isSatisfiedBy({
      notification: buildPush(true),
      ctx: { device },
    })).toBe(false);
  });

  it('preference disables channel', () => {
    const preference = { isChannelEnabled: () => false } as never;
    expect(spec.isSatisfiedBy({
      notification: buildEmail(true),
      ctx: { preference },
    })).toBe(false);
  });

  it('explain for push without device', () => {
    expect(spec.explain({ notification: buildPush(true) })).toMatch(/device/i);
  });

  it('explain for blocked device', () => {
    const device = { canReceivePush: () => false, status: { value: 'blocked' } } as never;
    expect(spec.explain({ notification: buildPush(true), ctx: { device } })).toMatch(/blocked/);
  });

  it('explain for email no address', () => {
    expect(spec.explain({ notification: buildEmail(false) })).toMatch(/email/);
  });

  it('explain for preference disabled', () => {
    const preference = { isChannelEnabled: () => false } as never;
    expect(spec.explain({ notification: buildEmail(true), ctx: { preference } })).toMatch(/disabled/);
  });

  it('explain returns null when satisfied', () => {
    expect(spec.explain({ notification: buildEmail(true) })).toBeNull();
  });
});
