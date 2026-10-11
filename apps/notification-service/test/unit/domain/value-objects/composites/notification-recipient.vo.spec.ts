import { describe, it, expect } from '@jest/globals';
import { NotificationRecipientVO } from '../../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationChannelVO } from '../../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { EmailAddressVO } from '../../../../../src/module/domain/value-objects/primitives/email-address.vo.js';
import { PhoneNumberVO } from '../../../../../src/module/domain/value-objects/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '../../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { FIXED_USER_ID } from '../../../../helpers/test-factories.js';

describe('NotificationRecipientVO', () => {
  it('create email channel without email throws', () => {
    expect(() =>
      NotificationRecipientVO.create({
        userId: UserIdVO.create(FIXED_USER_ID),
        channel: NotificationChannelVO.email(),
      }),
    ).toThrow();
  });
  it('create email channel with email ok', () => {
    const vo = NotificationRecipientVO.create({
      userId: UserIdVO.create(FIXED_USER_ID),
      channel: NotificationChannelVO.email(),
      email: EmailAddressVO.create('user@example.com'),
    });
    expect(vo.hasEmail()).toBe(true);
  });
  it('sms without phone throws', () => {
    expect(() =>
      NotificationRecipientVO.create({
        userId: UserIdVO.create(FIXED_USER_ID),
        channel: NotificationChannelVO.sms(),
      }),
    ).toThrow();
  });
  it('push without token throws', () => {
    expect(() =>
      NotificationRecipientVO.create({
        userId: UserIdVO.create(FIXED_USER_ID),
        channel: NotificationChannelVO.push(),
      }),
    ).toThrow();
  });
  it('push with token ok', () => {
    const vo = NotificationRecipientVO.create({
      userId: UserIdVO.create(FIXED_USER_ID),
      channel: NotificationChannelVO.push(),
      deviceToken: DeviceTokenVO.create('abcdefghijklmnop1234'),
    });
    expect(vo.hasDeviceToken()).toBe(true);
  });
  it('hasPhone', () => {
    const vo = NotificationRecipientVO.create({
      userId: UserIdVO.create(FIXED_USER_ID),
      channel: NotificationChannelVO.sms(),
      phone: PhoneNumberVO.create('+8801712345678'),
    });
    expect(vo.hasPhone()).toBe(true);
  });
  it('reconstitute', () => {
    const vo = NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute('any'),
      channel: NotificationChannelVO.email(),
    });
    expect(vo.userId.value).toBe('any');
  });
});
