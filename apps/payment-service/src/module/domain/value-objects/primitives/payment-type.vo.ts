/**
 * PaymentType Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidPaymentTypeError } from '../../errors/payment.errors.js';

export const PAYMENT_TYPE = {
  ONE_TIME: 'one_time',
  RECURRING: 'recurring',
  INSTALLMENT: 'installment',
  SUBSCRIPTION: 'subscription',
  PREPAID: 'prepaid',
  POSTPAID: 'postpaid',
} as const;

export type PaymentTypeValue = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];

const ALLOWED = Object.values(PAYMENT_TYPE) as readonly string[];

export class PaymentTypeVO extends BaseTypeVO<PaymentTypeValue> {
  private constructor(value: PaymentTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): PaymentTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPaymentTypeError(raw, ALLOWED);
    }
    return new PaymentTypeVO(raw as PaymentTypeValue);
  }

  static reconstitute(raw: string): PaymentTypeVO {
    return new PaymentTypeVO(raw as PaymentTypeValue);
  }

  static oneTime(): PaymentTypeVO { return new PaymentTypeVO(PAYMENT_TYPE.ONE_TIME); }
  static recurring(): PaymentTypeVO { return new PaymentTypeVO(PAYMENT_TYPE.RECURRING); }
  static installment(): PaymentTypeVO { return new PaymentTypeVO(PAYMENT_TYPE.INSTALLMENT); }
  static subscription(): PaymentTypeVO { return new PaymentTypeVO(PAYMENT_TYPE.SUBSCRIPTION); }

  isRecurring(): boolean {
    return this.value === PAYMENT_TYPE.RECURRING || this.value === PAYMENT_TYPE.SUBSCRIPTION;
  }

  isInstallment(): boolean {
    return this.value === PAYMENT_TYPE.INSTALLMENT;
  }
}
