/**
 * PaymentMethod Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_TYPE,
} from '@vubon/shared-constants/business/payment';
import { InvalidPaymentMethodError } from '../../errors/payment.errors.js';

type MethodValue = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
const ALLOWED = Object.values(PAYMENT_METHOD) as readonly string[];

const CARD_METHODS: readonly string[] = [
  PAYMENT_METHOD.CARD,
  PAYMENT_METHOD.CREDIT_CARD,
  PAYMENT_METHOD.DEBIT_CARD,
];
const MOBILE_BANKING: readonly string[] = [PAYMENT_METHOD.MOBILE_BANKING, PAYMENT_METHOD.WALLET];
const BANK_BASED: readonly string[] = [PAYMENT_METHOD.NET_BANKING, PAYMENT_METHOD.BANK_TRANSFER];

export class PaymentMethodVO extends BaseVO<MethodValue> {
  private constructor(value: MethodValue) {
    super(value);
  }

  static create(raw: string): PaymentMethodVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPaymentMethodError(raw, ALLOWED);
    }
    return new PaymentMethodVO(raw as MethodValue);
  }

  static reconstitute(raw: string): PaymentMethodVO {
    return new PaymentMethodVO(raw as MethodValue);
  }

  isCard(): boolean {
    return CARD_METHODS.includes(this.value);
  }

  isMobileBanking(): boolean {
    return MOBILE_BANKING.includes(this.value);
  }

  isBankBased(): boolean {
    return BANK_BASED.includes(this.value);
  }

  isCash(): boolean {
    return this.value === PAYMENT_METHOD.CASH_ON_DELIVERY;
  }

  isOnline(): boolean {
    return !this.isCash();
  }

  /** Online methods require a gateway; cash does not. */
  requiresGateway(): boolean {
    return this.isOnline();
  }

  /** Methods that can be refunded automatically. */
  supportsAutoRefund(): boolean {
    return this.isOnline();
  }

  kind(): string {
    if (this.isCard()) return PAYMENT_METHOD_TYPE.ONLINE;
    if (this.isCash()) return PAYMENT_METHOD_TYPE.OFFLINE;
    return PAYMENT_METHOD_TYPE.ONLINE;
  }
}
