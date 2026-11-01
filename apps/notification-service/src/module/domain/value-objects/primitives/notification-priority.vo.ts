/**
 * NotificationPriority Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_PRIORITY_WEIGHT,
  NOTIFICATION_PRIORITY_TTL,
} from '@vubon/shared-constants/platform';
import { InvalidNotificationPriorityError } from '@domain/errors/notification.errors.js';

export type NotificationPriorityValue =
  (typeof NOTIFICATION_PRIORITY)[keyof typeof NOTIFICATION_PRIORITY];

const ALLOWED = Object.values(NOTIFICATION_PRIORITY) as readonly string[];

export class NotificationPriorityVO extends BaseVO<NotificationPriorityValue> {
  private constructor(value: NotificationPriorityValue) {
    super(value);
  }

  static create(raw: string): NotificationPriorityVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationPriorityError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidNotificationPriorityError(normalized, ALLOWED);
    }
    return new NotificationPriorityVO(normalized as NotificationPriorityValue);
  }

  static reconstitute(raw: string): NotificationPriorityVO {
    return new NotificationPriorityVO(raw as NotificationPriorityValue);
  }

  static critical(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.CRITICAL); }
  static high(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.HIGH); }
  static normal(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.NORMAL); }
  static low(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.LOW); }
  static silent(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.SILENT); }

  get weight(): number {
    return NOTIFICATION_PRIORITY_WEIGHT[this.value];
  }

  get ttlSeconds(): number {
    return NOTIFICATION_PRIORITY_TTL[this.value];
  }

  isUrgent(): boolean {
    return this.value === NOTIFICATION_PRIORITY.CRITICAL || this.value === NOTIFICATION_PRIORITY.HIGH;
  }

  isSilent(): boolean {
    return this.value === NOTIFICATION_PRIORITY.SILENT;
  }

  isHigherThan(other: NotificationPriorityVO): boolean {
    return this.weight > other.weight;
  }
}
