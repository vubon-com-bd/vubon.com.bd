/**
 * NotificationRecipientVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Channel-specific destination (email/phone/device token)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';

export interface NotificationRecipientProps {
  readonly userId: UserIdVO;
  readonly channel: NotificationChannelVO;
  readonly email?: EmailAddressVO;
  readonly phone?: PhoneNumberVO;
  readonly deviceToken?: DeviceTokenVO;
  readonly webhookUrl?: WebhookUrlVO;
}

export class NotificationRecipientVO extends BaseVO<NotificationRecipientProps> {
  private constructor(props: NotificationRecipientProps) {
    super(Object.freeze(props));
  }

  static create(props: NotificationRecipientProps): NotificationRecipientVO {
    const vo = new NotificationRecipientVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationRecipientProps): NotificationRecipientVO {
    return new NotificationRecipientVO(props);
  }

  protected validate(): void {
    const v = this.value;
    switch (v.channel.value) {
      case NOTIFICATION_CHANNEL.EMAIL:
        if (!v.email) throw new ValidationError('Email channel requires email address', 'email');
        break;
      case NOTIFICATION_CHANNEL.SMS:
      case NOTIFICATION_CHANNEL.WHATSAPP:
        if (!v.phone) throw new ValidationError(`${v.channel.value} channel requires phone`, 'phone');
        break;
      case NOTIFICATION_CHANNEL.PUSH:
        if (!v.deviceToken) {
          throw new ValidationError('Push channel requires device token', 'deviceToken');
        }
        break;
      case NOTIFICATION_CHANNEL.WEBHOOK:
        if (!v.webhookUrl) {
          throw new ValidationError('Webhook channel requires webhook URL', 'webhookUrl');
        }
        break;
    }
  }

  get userId(): UserIdVO { return this.value.userId; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get email(): EmailAddressVO | undefined { return this.value.email; }
  get phone(): PhoneNumberVO | undefined { return this.value.phone; }
  get deviceToken(): DeviceTokenVO | undefined { return this.value.deviceToken; }
  get webhookUrl(): WebhookUrlVO | undefined { return this.value.webhookUrl; }

  get destination(): string {
    return (
      this.value.email?.value ??
      this.value.phone?.value ??
      this.value.deviceToken?.value ??
      this.value.webhookUrl?.value ??
      ''
    );
  }

  get maskedDestination(): string {
    if (this.value.email) return this.value.email.value.replace(/(.{2}).*(@.*)/, '$1***$2');
    if (this.value.phone) return this.value.phone.masked;
    if (this.value.deviceToken) return this.value.deviceToken.masked;
    return this.value.webhookUrl?.value ?? '';
  }
}
