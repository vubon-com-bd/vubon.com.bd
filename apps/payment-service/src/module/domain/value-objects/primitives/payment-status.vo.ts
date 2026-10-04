/**
 * PaymentStatus Value Object — includes transition state machine
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { PAYMENT_STATUS } from '@vubon/shared-constants/business/payment';
import { InvalidPaymentStatusError } from '../../errors/payment.errors.js';

const ALLOWED = Object.values(PAYMENT_STATUS) as readonly string[];

export class PaymentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidPaymentStatusError(String(raw), ALLOWED);
    }
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPaymentStatusError(raw, ALLOWED);
    }
    return new PaymentStatusVO(raw);
  }

  // ─── Named constructors ───
  static pending(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.PENDING); }
  static processing(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.PROCESSING); }
  static authorized(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.AUTHORIZED); }
  static captured(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.CAPTURED); }
  static paid(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.PAID); }
  static failed(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.FAILED); }
  static declined(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.DECLINED); }
  static cancelled(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.CANCELLED); }
  static refunded(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.REFUNDED); }
  static partiallyRefunded(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.PARTIALLY_REFUNDED); }
  static chargeback(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.CHARGEBACK); }
  static expired(): PaymentStatusVO { return new PaymentStatusVO(PAYMENT_STATUS.EXPIRED); }

  static reconstitute(raw: string): PaymentStatusVO {
    return new PaymentStatusVO(raw);
  }

  // ─── Predicates ───
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

  /** Terminal states cannot transition anywhere. */
  isFinal(): boolean {
    return [
      PAYMENT_STATUS.CANCELLED,
      PAYMENT_STATUS.REFUNDED,
      PAYMENT_STATUS.CHARGEBACK,
      PAYMENT_STATUS.EXPIRED,
    ].includes(this.value as never);
  }

  /** Successfully settled — money is captured. */
  isSettled(): boolean {
    return [PAYMENT_STATUS.CAPTURED, PAYMENT_STATUS.PAID, PAYMENT_STATUS.PARTIALLY_REFUNDED].includes(
      this.value as never,
    );
  }

  /** Payment failed terminally or can be retried. */
  isRecoverable(): boolean {
    return this.value === PAYMENT_STATUS.FAILED || this.value === PAYMENT_STATUS.DECLINED;
  }

  isActive(): boolean {
    return !this.isFinal() && !this.isFailed() && !this.isDeclined();
  }

  // ─── State machine ───
  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [PAYMENT_STATUS.PENDING]: [
        PAYMENT_STATUS.PROCESSING,
        PAYMENT_STATUS.AUTHORIZED,
        PAYMENT_STATUS.PAID,
        PAYMENT_STATUS.FAILED,
        PAYMENT_STATUS.DECLINED,
        PAYMENT_STATUS.CANCELLED,
        PAYMENT_STATUS.EXPIRED,
      ],
      [PAYMENT_STATUS.PROCESSING]: [
        PAYMENT_STATUS.AUTHORIZED,
        PAYMENT_STATUS.CAPTURED,
        PAYMENT_STATUS.PAID,
        PAYMENT_STATUS.FAILED,
        PAYMENT_STATUS.DECLINED,
        PAYMENT_STATUS.CANCELLED,
        PAYMENT_STATUS.EXPIRED,
      ],
      [PAYMENT_STATUS.AUTHORIZED]: [
        PAYMENT_STATUS.CAPTURED,
        PAYMENT_STATUS.PAID,
        PAYMENT_STATUS.CANCELLED,
        PAYMENT_STATUS.EXPIRED,
      ],
      [PAYMENT_STATUS.CAPTURED]: [
        PAYMENT_STATUS.PAID,
        PAYMENT_STATUS.PARTIALLY_REFUNDED,
        PAYMENT_STATUS.REFUNDED,
        PAYMENT_STATUS.CHARGEBACK,
      ],
      [PAYMENT_STATUS.PAID]: [
        PAYMENT_STATUS.PARTIALLY_REFUNDED,
        PAYMENT_STATUS.REFUNDED,
        PAYMENT_STATUS.CHARGEBACK,
      ],
      [PAYMENT_STATUS.PARTIALLY_REFUNDED]: [
        PAYMENT_STATUS.PARTIALLY_REFUNDED,
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
    return (transitions[this.value] ?? []).includes(target);
  }
}
