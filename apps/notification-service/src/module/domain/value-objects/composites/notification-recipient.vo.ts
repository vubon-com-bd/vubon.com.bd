/**
 * NotificationRecipientVO — who receives this notification and via what
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { EmailAddressVO } from '../primitives/email-address.vo.js';
import { PhoneNumberVO } from '../primitives/phone-number.vo.js';
import { DeviceTokenVO } from '../primitives/device-token.vo.js';
import { NotificationChannelVO } from '../primitives/notification-channel.vo.js';

export interface NotificationRecipientVOProps {
  readonly userId: UserIdVO;
  readonly channel: NotificationChannelVO;
  readonly email?: EmailAddressVO;
  readonly phone?: PhoneNumberVO;
  readonly deviceToken?: DeviceTokenVO;
}

export class NotificationRecipientVO extends BaseVO<NotificationRecipientVOProps> {
  private constructor(props: NotificationRecipientVOProps) {
    super(props);
  }

  static create(props: NotificationRecipientVOProps): NotificationRecipientVO {
    const vo = new NotificationRecipientVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationRecipientVOProps): NotificationRecipientVO {
    return new NotificationRecipientVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.channel.requiresEmail() && !v.email) {
      throw new ValidationError('Email channel requires an email address', 'email');
    }
    if (v.channel.requiresPhone() && !v.phone) {
      throw new ValidationError('SMS/voice channel requires a phone number', 'phone');
    }
    if (v.channel.requiresDeviceToken() && !v.deviceToken) {
      throw new ValidationError('Push channel requires a device token', 'deviceToken');
    }
  }

  get userId(): UserIdVO { return this.value.userId; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get email(): EmailAddressVO | undefined { return this.value.email; }
  get phone(): PhoneNumberVO | undefined { return this.value.phone; }
  get deviceToken(): DeviceTokenVO | undefined { return this.value.deviceToken; }

  hasEmail(): boolean { return this.value.email !== undefined; }
  hasPhone(): boolean { return this.value.phone !== undefined; }
  hasDeviceToken(): boolean { return this.value.deviceToken !== undefined; }
}
