/**
 * NotificationStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 *
 * State machine:
 *   draft → pending → queued → scheduled → sending → sent → delivered
 *   pending/queued → cancelled
 *   * → failed, expired, archived
 *
 * Expiry: any non-terminal status → expired (time-based, not user-driven)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform';
import { InvalidNotificationStatusError } from '@domain/errors/notification.errors.js';

export type NotificationStatusValue =
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];

const ALLOWED = Object.values(NOTIFICATION_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  draft: ['pending', 'archived', 'cancelled', 'expired'],
  pending: ['queued', 'scheduled', 'sending', 'cancelled', 'failed', 'expired'],
  queued: ['sending', 'cancelled', 'failed', 'expired'],
  scheduled: ['queued', 'sending', 'cancelled', 'failed', 'expired'],
  sending: ['sent', 'failed', 'expired'],
  sent: ['delivered', 'failed', 'expired'],
  delivered: ['archived'],
  failed: ['pending', 'cancelled', 'archived', 'expired'],
  cancelled: ['archived'],
  expired: ['archived'],
  archived: [],
};

export class NotificationStatusVO extends BaseStatusVO<NotificationStatusValue> {
  private constructor(value: NotificationStatusValue) {
    super(value);
  }

  static create(raw: string): NotificationStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidNotificationStatusError(normalized, ALLOWED);
    }
    return new NotificationStatusVO(normalized as NotificationStatusValue);
  }

  static reconstitute(raw: string): NotificationStatusVO {
    return new NotificationStatusVO(raw as NotificationStatusValue);
  }

  static draft(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.DRAFT); }
  static pending(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.PENDING); }
  static queued(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.QUEUED); }
  static scheduled(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.SCHEDULED); }
  static sending(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.SENDING); }
  static sent(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.SENT); }
  static delivered(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.DELIVERED); }
  static failed(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.FAILED); }
  static cancelled(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.CANCELLED); }
  static expired(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.EXPIRED); }
  static archived(): NotificationStatusVO { return new NotificationStatusVO(NOTIFICATION_STATUS.ARCHIVED); }

  isDraft(): boolean { return this.value === NOTIFICATION_STATUS.DRAFT; }
  isPending(): boolean { return this.value === NOTIFICATION_STATUS.PENDING; }
  isQueued(): boolean { return this.value === NOTIFICATION_STATUS.QUEUED; }
  isScheduled(): boolean { return this.value === NOTIFICATION_STATUS.SCHEDULED; }
  isSending(): boolean { return this.value === NOTIFICATION_STATUS.SENDING; }
  isSent(): boolean { return this.value === NOTIFICATION_STATUS.SENT; }
  isDelivered(): boolean { return this.value === NOTIFICATION_STATUS.DELIVERED; }
  isFailed(): boolean { return this.value === NOTIFICATION_STATUS.FAILED; }
  isCancelled(): boolean { return this.value === NOTIFICATION_STATUS.CANCELLED; }
  isExpired(): boolean { return this.value === NOTIFICATION_STATUS.EXPIRED; }
  isArchived(): boolean { return this.value === NOTIFICATION_STATUS.ARCHIVED; }

  isTerminal(): boolean {
    return this.isDelivered() || this.isCancelled() || this.isExpired() || this.isArchived();
  }

  isInFlight(): boolean {
    return this.isQueued() || this.isScheduled() || this.isSending() || this.isSent();
  }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
