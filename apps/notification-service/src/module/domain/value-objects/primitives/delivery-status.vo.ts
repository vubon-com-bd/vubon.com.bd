/**
 * DeliveryStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DELIVERY_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidDeliveryStatusError } from '../../errors/delivery.errors.js';

const ALLOWED = Object.values(NOTIFICATION_DELIVERY_STATUS) as readonly string[];

export class DeliveryStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDeliveryStatusError(raw, ALLOWED);
    }
    return new DeliveryStatusVO(raw);
  }

  static reconstitute(raw: string): DeliveryStatusVO {
    return new DeliveryStatusVO(raw);
  }

  static queued(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.QUEUED); }
  static sending(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.SENDING); }
  static sent(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.SENT); }
  static delivered(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.DELIVERED); }
  static read(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.READ); }
  static failed(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.FAILED); }
  static bounced(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.BOUNCED); }
  static rejected(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.REJECTED); }
  static unsubscribed(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.UNSUBSCRIBED); }
  static blocked(): DeliveryStatusVO { return new DeliveryStatusVO(NOTIFICATION_DELIVERY_STATUS.BLOCKED); }

  isQueued(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.QUEUED; }
  isSending(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.SENDING; }
  isSent(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.SENT; }
  isDelivered(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.DELIVERED; }
  isRead(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.READ; }
  isFailed(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.FAILED; }
  isBounced(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.BOUNCED; }
  isRejected(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.REJECTED; }
  isUnsubscribed(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.UNSUBSCRIBED; }
  isBlocked(): boolean { return this.value === NOTIFICATION_DELIVERY_STATUS.BLOCKED; }

  isSuccess(): boolean {
    return this.isDelivered() || this.isRead();
  }

  isFinal(): boolean {
    return [
      NOTIFICATION_DELIVERY_STATUS.DELIVERED,
      NOTIFICATION_DELIVERY_STATUS.READ,
      NOTIFICATION_DELIVERY_STATUS.FAILED,
      NOTIFICATION_DELIVERY_STATUS.BOUNCED,
      NOTIFICATION_DELIVERY_STATUS.REJECTED,
      NOTIFICATION_DELIVERY_STATUS.UNSUBSCRIBED,
      NOTIFICATION_DELIVERY_STATUS.BLOCKED,
    ].includes(this.value as never);
  }

  isRecoverable(): boolean {
    return this.isFailed();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [NOTIFICATION_DELIVERY_STATUS.QUEUED]: [
        NOTIFICATION_DELIVERY_STATUS.SENDING,
        NOTIFICATION_DELIVERY_STATUS.FAILED,
      ],
      [NOTIFICATION_DELIVERY_STATUS.SENDING]: [
        NOTIFICATION_DELIVERY_STATUS.SENT,
        NOTIFICATION_DELIVERY_STATUS.FAILED,
        NOTIFICATION_DELIVERY_STATUS.BOUNCED,
      ],
      [NOTIFICATION_DELIVERY_STATUS.SENT]: [
        NOTIFICATION_DELIVERY_STATUS.DELIVERED,
        NOTIFICATION_DELIVERY_STATUS.READ,
        NOTIFICATION_DELIVERY_STATUS.FAILED,
        NOTIFICATION_DELIVERY_STATUS.BOUNCED,
        NOTIFICATION_DELIVERY_STATUS.REJECTED,
      ],
      [NOTIFICATION_DELIVERY_STATUS.DELIVERED]: [NOTIFICATION_DELIVERY_STATUS.READ],
      [NOTIFICATION_DELIVERY_STATUS.FAILED]: [NOTIFICATION_DELIVERY_STATUS.QUEUED],
      [NOTIFICATION_DELIVERY_STATUS.READ]: [],
      [NOTIFICATION_DELIVERY_STATUS.BOUNCED]: [],
      [NOTIFICATION_DELIVERY_STATUS.REJECTED]: [],
      [NOTIFICATION_DELIVERY_STATUS.UNSUBSCRIBED]: [],
      [NOTIFICATION_DELIVERY_STATUS.BLOCKED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
