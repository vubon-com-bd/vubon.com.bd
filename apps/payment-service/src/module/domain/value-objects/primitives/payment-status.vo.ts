/**
 * PaymentStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → processing → authorized → captured → paid
 *   any → failed | declined | cancelled
 *   paid → refunded | partially_refunded → chargeback
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { PAYMENT_STATUS } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type PaymentStatusValue = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(PAYMENT_STATUS);

const VALID_TRANSITIONS: Readonly<Record<PaymentStatusValue, readonly PaymentStatusValue[]>> = {
  [PAYMENT_STATUS.PENDING]: [
    PAYMENT_STATUS.PROCESSING,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.CANCELLED,
    PAYMENT_STATUS.EXPIRED,
  ],
  [PAYMENT_STATUS.PROCESSING]: [
    PAYMENT_STATUS.AUTHORIZED,
    PAYMENT_STATUS.CAPTURED,
    PAYMENT_STATUS.PAID,
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.DECLINED,
  ],
  [PAYMENT_STATUS.AUTHORIZED]: [
    PAYMENT_STATUS.CAPTURED,
    PAYMENT_STATUS.PAID,
    PAYMENT_STATUS.CANCELLED,
    PAYMENT_STATUS.EXPIRED,
  ],
  [PAYMENT_STATUS.CAPTURED]: [
    PAYMENT_STATUS.PAID,
    PAYMENT_STATUS.REFUNDED,
    PAYMENT_STATUS.PARTIALLY_REFUNDED,
    PAYMENT_STATUS.CHARGEBACK,
  ],
  [PAYMENT_STATUS.PAID]: [
    PAYMENT_STATUS.REFUNDED,
    PAYMENT_STATUS.PARTIALLY_REFUNDED,
    PAYMENT_STATUS.CHARGEBACK,
  ],
  [PAYMENT_STATUS.PARTIALLY_REFUNDED]: [
    PAYMENT_STATUS.REFUNDED,
    PAYMENT_STATUS.CHARGEBACK,
  ],
  [PAYMENT_STATUS.FAILED]: [PAYMENT_STATUS.PENDING],
  [PAYMENT_STATUS.DECLINED]: [PAYMENT_STATUS.PENDING],
  [PAYMENT_STATUS.CANCELLED]: [],
  [PAYMENT_STATUS.REFUNDED]: [],
  [PAYMENT_STATUS.CHARGEBACK]: [],
  [PAYMENT_STATUS.EXPIRED]: [],
};

export class PaymentStatusVO extends BaseStatusVO<PaymentStatusValue> {
  private constructor(value: PaymentStatusValue) {
    super(value);
  }

  static create(raw: string): PaymentStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PaymentStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid PaymentStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new PaymentStatusVO(normalized as PaymentStatusValue);
  }

  static pending(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.PENDING);
  }

  static processing(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.PROCESSING);
  }

  static authorized(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.AUTHORIZED);
  }

  static captured(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.CAPTURED);
  }

  static paid(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.PAID);
  }

  static failed(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.FAILED);
  }

  static declined(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.DECLINED);
  }

  static cancelled(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.CANCELLED);
  }

  static refunded(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.REFUNDED);
  }

  static partiallyRefunded(): PaymentStatusVO {
    return new PaymentStatusVO(PAYMENT_STATUS.PARTIALLY_REFUNDED);
  }

  // ═══ Predicates ═══
  isPending(): boolean { return this.value === PAYMENT_STATUS.PENDING; }
  isProcessing(): boolean { return this.value === PAYMENT_STATUS.PROCESSING; }
  isAuthorized(): boolean { return this.value === PAYMENT_STATUS.AUTHORIZED; }
  isCaptured(): boolean { return this.value === PAYMENT_STATUS.CAPTURED; }
  isPaid(): boolean { return this.value === PAYMENT_STATUS.PAID; }
  isFailed(): boolean { return this.value === PAYMENT_STATUS.FAILED; }
  isDeclined(): boolean { return this.value === PAYMENT_STATUS.DECLINED; }
  isCancelled(): boolean { return this.value === PAYMENT_STATUS.CANCELLED; }
  isRefunded(): boolean { return this.value === PAYMENT_STATUS.REFUNDED; }
  isPartiallyRefunded(): boolean { return this.value === PAYMENT_STATUS.PARTIALLY_REFUNDED; }
  isChargeback(): boolean { return this.value === PAYMENT_STATUS.CHARGEBACK; }
  isExpired(): boolean { return this.value === PAYMENT_STATUS.EXPIRED; }

  isSuccessful(): boolean {
    return this.isPaid() || this.isCaptured() || this.isAuthorized();
  }

  isFinal(): boolean {
    return (
      this.isPaid() ||
      this.isRefunded() ||
      this.isCancelled() ||
      this.isChargeback() ||
      this.isExpired()
    );
  }

  isRefundable(): boolean {
    return this.isPaid() || this.isCaptured() || this.isPartiallyRefunded();
  }

  isRetryable(): boolean {
    return this.isFailed() || this.isDeclined();
  }

  // ═══ State Machine ═══
  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as PaymentStatusValue);
  }
}
