/**
 * NotificationPriority Value Object — with weight + TTL metadata
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_PRIORITY_WEIGHT,
  NOTIFICATION_PRIORITY_TTL,
} from '@vubon/shared-constants/platform/notification';
import { InvalidNotificationPriorityError } from '../../errors/notification.errors.js';

type PriorityValue = (typeof NOTIFICATION_PRIORITY)[keyof typeof NOTIFICATION_PRIORITY];
const ALLOWED = Object.values(NOTIFICATION_PRIORITY) as readonly string[];

export class NotificationPriorityVO extends BaseTypeVO<PriorityValue> {
  private constructor(value: PriorityValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): NotificationPriorityVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidNotificationPriorityError(raw, ALLOWED);
    }
    return new NotificationPriorityVO(raw as PriorityValue);
  }

  static reconstitute(raw: string): NotificationPriorityVO {
    return new NotificationPriorityVO(raw as PriorityValue);
  }

  // ─── Named constructors ───
  static critical(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.CRITICAL); }
  static high(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.HIGH); }
  static normal(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.NORMAL); }
  static low(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.LOW); }
  static silent(): NotificationPriorityVO { return new NotificationPriorityVO(NOTIFICATION_PRIORITY.SILENT); }

  // ─── Predicates ───
  isCritical(): boolean { return this.value === NOTIFICATION_PRIORITY.CRITICAL; }
  isHigh(): boolean { return this.value === NOTIFICATION_PRIORITY.HIGH; }
  isNormal(): boolean { return this.value === NOTIFICATION_PRIORITY.NORMAL; }
  isLow(): boolean { return this.value === NOTIFICATION_PRIORITY.LOW; }
  isSilent(): boolean { return this.value === NOTIFICATION_PRIORITY.SILENT; }

  isUrgent(): boolean {
    return this.isCritical() || this.isHigh();
  }

  /** Higher weight = higher priority. */
  weight(): number {
    return NOTIFICATION_PRIORITY_WEIGHT[this.value as keyof typeof NOTIFICATION_PRIORITY_WEIGHT];
  }

  /** TTL in seconds — how long the notification remains valid. */
  ttlSeconds(): number {
    return NOTIFICATION_PRIORITY_TTL[this.value as keyof typeof NOTIFICATION_PRIORITY_TTL];
  }

  /** Can bypass quiet hours? */
  bypassesQuietHours(): boolean {
    return this.isCritical();
  }

  /** Compare priority (higher means more urgent). */
  isHigherThan(other: NotificationPriorityVO): boolean {
    return this.weight() > other.weight();
  }
}
