/**
 * NotificationChannel Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform/notification';
import { InvalidNotificationChannelError } from '../../errors/notification.errors.js';

type ChannelValue = (typeof NOTIFICATION_CHANNEL)[keyof typeof NOTIFICATION_CHANNEL];
const ALLOWED = Object.values(NOTIFICATION_CHANNEL) as readonly string[];

const MESSAGING_CHANNELS: readonly string[] = [
  NOTIFICATION_CHANNEL.WHATSAPP,
  NOTIFICATION_CHANNEL.TELEGRAM,
  NOTIFICATION_CHANNEL.MESSENGER,
  NOTIFICATION_CHANNEL.SLACK,
];

export class NotificationChannelVO extends BaseTypeVO<ChannelValue> {
  private constructor(value: ChannelValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): NotificationChannelVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidNotificationChannelError(raw, ALLOWED);
    }
    return new NotificationChannelVO(raw as ChannelValue);
  }

  static reconstitute(raw: string): NotificationChannelVO {
    return new NotificationChannelVO(raw as ChannelValue);
  }

  // Named constructors
  static email(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.EMAIL); }
  static sms(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.SMS); }
  static push(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.PUSH); }
  static inApp(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.IN_APP); }
  static webhook(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.WEBHOOK); }
  static whatsapp(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.WHATSAPP); }
  static telegram(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.TELEGRAM); }
  static voice(): NotificationChannelVO { return new NotificationChannelVO(NOTIFICATION_CHANNEL.VOICE); }

  // Predicates
  isEmail(): boolean { return this.value === NOTIFICATION_CHANNEL.EMAIL; }
  isSms(): boolean { return this.value === NOTIFICATION_CHANNEL.SMS; }
  isPush(): boolean { return this.value === NOTIFICATION_CHANNEL.PUSH; }
  isInApp(): boolean { return this.value === NOTIFICATION_CHANNEL.IN_APP; }
  isWebhook(): boolean { return this.value === NOTIFICATION_CHANNEL.WEBHOOK; }
  isWhatsapp(): boolean { return this.value === NOTIFICATION_CHANNEL.WHATSAPP; }
  isTelegram(): boolean { return this.value === NOTIFICATION_CHANNEL.TELEGRAM; }
  isVoice(): boolean { return this.value === NOTIFICATION_CHANNEL.VOICE; }

  isMessaging(): boolean {
    return MESSAGING_CHANNELS.includes(this.value);
  }

  /** Instant = real-time delivery (push, in-app). */
  isInstant(): boolean {
    return this.isPush() || this.isInApp();
  }

  /** Requires a device token. */
  requiresDeviceToken(): boolean {
    return this.isPush();
  }

  /** Requires an email address. */
  requiresEmail(): boolean {
    return this.isEmail();
  }

  /** Requires a phone number. */
  requiresPhone(): boolean {
    return this.isSms() || this.isWhatsapp() || this.isVoice();
  }
}
