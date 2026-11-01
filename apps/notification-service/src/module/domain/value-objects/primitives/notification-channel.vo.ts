/**
 * NotificationChannel Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';
import { InvalidNotificationChannelError } from '@domain/errors/notification.errors.js';

export type NotificationChannelValue =
  (typeof NOTIFICATION_CHANNEL)[keyof typeof NOTIFICATION_CHANNEL];

const ALLOWED = Object.values(NOTIFICATION_CHANNEL) as readonly string[];

export class NotificationChannelVO extends BaseTypeVO<NotificationChannelValue> {
  private constructor(value: NotificationChannelValue) {
    super(value);
  }

  static create(raw: string): NotificationChannelVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationChannelError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidNotificationChannelError(normalized, ALLOWED);
    }
    return new NotificationChannelVO(normalized as NotificationChannelValue);
  }

  static reconstitute(raw: string): NotificationChannelVO {
    return new NotificationChannelVO(raw as NotificationChannelValue);
  }

  static email(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.EMAIL); }
  static sms(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.SMS); }
  static push(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.PUSH); }
  static inApp(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.IN_APP); }
  static webhook(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.WEBHOOK); }

  isInstant(): boolean {
    return (
      this.value === NOTIFICATION_CHANNEL.PUSH ||
      this.value === NOTIFICATION_CHANNEL.IN_APP
    );
  }

  isExternal(): boolean {
    return (
      this.value === NOTIFICATION_CHANNEL.EMAIL ||
      this.value === NOTIFICATION_CHANNEL.SMS ||
      this.value === NOTIFICATION_CHANNEL.WEBHOOK
    );
  }
}
