/**
 * NotificationStatus Value Object — with full state machine
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidNotificationStatusError } from '../../errors/notification.errors.js';

const ALLOWED = Object.values(NOTIFICATION_STATUS) as readonly string[];

export class NotificationStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): NotificationStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidNotificationStatusError(String(raw), ALLOWED);
    }
    return new NotificationStatusVO(raw);
  }

  static reconstitute(raw: string): NotificationStatusVO {
    return new NotificationStatusVO(raw);
  }

  // ─── Named constructors ───
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

  // ─── Predicates ───
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

  /** Successful delivery path completion. */
  isSuccess(): boolean {
    return this.isSent() || this.isDelivered();
  }

  /** Terminal states — cannot transition anywhere. */
  isFinal(): boolean {
    return [
      NOTIFICATION_STATUS.DELIVERED,
      NOTIFICATION_STATUS.CANCELLED,
      NOTIFICATION_STATUS.EXPIRED,
      NOTIFICATION_STATUS.ARCHIVED,
    ].includes(this.value as never);
  }

  /** Is actively in-flight (sending or about to send). */
  isInFlight(): boolean {
    return this.isQueued() || this.isSending();
  }

  /** Can this notification be retried? */
  isRecoverable(): boolean {
    return this.isFailed();
  }

  isActive(): boolean {
    return !this.isFinal() && !this.isFailed();
  }

  /**
   * Transition state machine.
   *
   * Business rule: notifications can expire from DRAFT, PENDING, QUEUED, or
   * SCHEDULED. Any state where the notification has not yet reached the
   * provider is eligible for TTL-based expiration. Once a notification is
   * SENDING, expiration is not allowed (must go through SENT/FAILED).
   */
  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [NOTIFICATION_STATUS.DRAFT]: [
        NOTIFICATION_STATUS.PENDING,
        NOTIFICATION_STATUS.SCHEDULED,
        NOTIFICATION_STATUS.CANCELLED,
        NOTIFICATION_STATUS.EXPIRED,
      ],
      [NOTIFICATION_STATUS.PENDING]: [
        NOTIFICATION_STATUS.QUEUED,
        NOTIFICATION_STATUS.SENDING,
        NOTIFICATION_STATUS.SCHEDULED,
        NOTIFICATION_STATUS.CANCELLED,
        NOTIFICATION_STATUS.FAILED,
        NOTIFICATION_STATUS.EXPIRED,
      ],
      [NOTIFICATION_STATUS.QUEUED]: [
        NOTIFICATION_STATUS.SENDING,
        NOTIFICATION_STATUS.FAILED,
        NOTIFICATION_STATUS.CANCELLED,
        NOTIFICATION_STATUS.EXPIRED,
      ],
      [NOTIFICATION_STATUS.SCHEDULED]: [
        NOTIFICATION_STATUS.PENDING,
        NOTIFICATION_STATUS.QUEUED,
        NOTIFICATION_STATUS.CANCELLED,
        NOTIFICATION_STATUS.EXPIRED,
      ],
      [NOTIFICATION_STATUS.SENDING]: [
        NOTIFICATION_STATUS.SENT,
        NOTIFICATION_STATUS.FAILED,
        NOTIFICATION_STATUS.DELIVERED,
      ],
      [NOTIFICATION_STATUS.SENT]: [
        NOTIFICATION_STATUS.DELIVERED,
        NOTIFICATION_STATUS.FAILED,
      ],
      [NOTIFICATION_STATUS.DELIVERED]: [NOTIFICATION_STATUS.ARCHIVED],
      [NOTIFICATION_STATUS.FAILED]: [
        NOTIFICATION_STATUS.PENDING,
        NOTIFICATION_STATUS.QUEUED,
      ],
      [NOTIFICATION_STATUS.CANCELLED]: [],
      [NOTIFICATION_STATUS.EXPIRED]: [],
      [NOTIFICATION_STATUS.ARCHIVED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
