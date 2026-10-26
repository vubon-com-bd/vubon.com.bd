/**
 * DeliveryStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DELIVERY_STATUS } from '@vubon/shared-constants/platform';
import { InvalidDeliveryStatusError } from '@domain/errors/delivery.errors.js';

export type DeliveryStatusValue =
  (typeof NOTIFICATION_DELIVERY_STATUS)[keyof typeof NOTIFICATION_DELIVERY_STATUS];

const ALLOWED = Object.values(NOTIFICATION_DELIVERY_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  queued: ['sending', 'failed', 'blocked'],
  sending: ['sent', 'failed', 'bounced'],
  sent: ['delivered', 'failed', 'bounced', 'rejected'],
  delivered: ['read'],
  read: [],
  failed: ['queued'],
  bounced: [],
  rejected: [],
  unsubscribed: [],
  blocked: [],
};

export class DeliveryStatusVO extends BaseStatusVO<DeliveryStatusValue> {
  private constructor(value: DeliveryStatusValue) {
    super(value);
  }

  static create(raw: string): DeliveryStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidDeliveryStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidDeliveryStatusError(normalized, ALLOWED);
    }
    return new DeliveryStatusVO(normalized as DeliveryStatusValue);
  }

  static reconstitute(raw: string): DeliveryStatusVO {
    return new DeliveryStatusVO(raw as DeliveryStatusValue);
  }

  static queued(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.QUEUED); }
  static sending(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.SENDING); }
  static sent(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.SENT); }
  static delivered(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.DELIVERED); }
  static failed(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.FAILED); }

  isQueued(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.QUEUED; }
  isSending(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.SENDING; }
  isSent(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.SENT; }
  isDelivered(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.DELIVERED; }
  isFailed(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.FAILED; }
  isBounced(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.BOUNCED; }
  isRead(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.READ; }

  isSuccess(): boolean {
    return this.isDelivered() || this.isRead();
  }

  isTerminal(): boolean {
    return (
      this.isDelivered() ||
      this.isRead() ||
      this.isBounced() ||
      this.isFailed() ||
      this.value === NOTIFICATION_DELIVERY_STATUS.REJECTED ||
      this.value === NOTIFICATION_DELIVERY_STATUS.BLOCKED ||
      this.value === NOTIFICATION_DELIVERY_STATUS.UNSUBSCRIBED
    );
  }

  canRetry(): boolean {
    return this.isFailed() || this.isQueued();
  }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
