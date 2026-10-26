/**
 * NotificationType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/platform';
import { InvalidNotificationTypeError } from '@domain/errors/notification.errors.js';

export type NotificationTypeValue = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

const ALLOWED = Object.values(NOTIFICATION_TYPE) as readonly string[];

export class NotificationTypeVO extends BaseTypeVO<NotificationTypeValue> {
  private constructor(value: NotificationTypeValue) {
    super(value);
  }

  static create(raw: string): NotificationTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationTypeError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidNotificationTypeError(normalized, ALLOWED);
    }
    return new NotificationTypeVO(normalized as NotificationTypeValue);
  }

  static reconstitute(raw: string): NotificationTypeVO {
    return new NotificationTypeVO(raw as NotificationTypeValue);
  }

  static transactional(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.TRANSACTIONAL); }
  static promotional(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.PROMOTIONAL); }
  static system(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.SYSTEM); }
  static security(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.SECURITY); }

  isTransactional(): boolean { return this.value === NOTIFICATION_TYPE.TRANSACTIONAL; }
  isPromotional(): boolean { return this.value === NOTIFICATION_TYPE.PROMOTIONAL; }
  isSecurity(): boolean { return this.value === NOTIFICATION_TYPE.SECURITY; }

  canOptOut(): boolean { return !this.isTransactional() && !this.isSecurity(); }
}
