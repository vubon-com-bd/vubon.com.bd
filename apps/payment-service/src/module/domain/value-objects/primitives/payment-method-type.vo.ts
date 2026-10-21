/**
 * PaymentMethodType Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Two-level classification:
 * - method: card, mobile_banking, wallet, cash_on_delivery, crypto, etc.
 * - type: online, offline, instant, deferred
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_TYPE,
} from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type PaymentMethodValue = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export type PaymentMethodTypeValue =
  (typeof PAYMENT_METHOD_TYPE)[keyof typeof PAYMENT_METHOD_TYPE];

const VALID_METHODS: readonly string[] = Object.values(PAYMENT_METHOD);
const VALID_TYPES: readonly string[] = Object.values(PAYMENT_METHOD_TYPE);

export interface PaymentMethodTypeValueShape {
  readonly method: PaymentMethodValue;
  readonly type: PaymentMethodTypeValue;
}

export class PaymentMethodTypeVO extends BaseVO<PaymentMethodTypeValueShape> {
  private constructor(value: PaymentMethodTypeValueShape) {
    super(value);
  }

  static create(method: string, type: string): PaymentMethodTypeVO {
    if (typeof method !== 'string') {
      throw new ValidationError('PaymentMethod must be a string', 'method');
    }
    if (typeof type !== 'string') {
      throw new ValidationError('PaymentMethodType must be a string', 'type');
    }
    const m = method.trim().toLowerCase();
    const t = type.trim().toLowerCase();
    if (!VALID_METHODS.includes(m)) {
      throw new ValidationError(
        `Invalid PaymentMethod "${m}". Allowed: ${VALID_METHODS.join(', ')}`,
        'method',
      );
    }
    if (!VALID_TYPES.includes(t)) {
      throw new ValidationError(
        `Invalid PaymentMethodType "${t}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new PaymentMethodTypeVO({
      method: m as PaymentMethodValue,
      type: t as PaymentMethodTypeValue,
    });
  }

  static reconstitute(
    method: PaymentMethodValue,
    type: PaymentMethodTypeValue,
  ): PaymentMethodTypeVO {
    return new PaymentMethodTypeVO({ method, type });
  }

  get method(): PaymentMethodValue { return this.value.method; }
  get type(): PaymentMethodTypeValue { return this.value.type; }

  isOnline(): boolean { return this.type === PAYMENT_METHOD_TYPE.ONLINE; }
  isOffline(): boolean { return this.type === PAYMENT_METHOD_TYPE.OFFLINE; }
  isInstant(): boolean { return this.type === PAYMENT_METHOD_TYPE.INSTANT; }
  isDeferred(): boolean { return this.type === PAYMENT_METHOD_TYPE.DEFERRED; }

  isCard(): boolean {
    return (
      this.method === PAYMENT_METHOD.CARD ||
      this.method === PAYMENT_METHOD.CREDIT_CARD ||
      this.method === PAYMENT_METHOD.DEBIT_CARD
    );
  }

  isMobileBanking(): boolean {
    return this.method === PAYMENT_METHOD.MOBILE_BANKING;
  }

  isWallet(): boolean {
    return this.method === PAYMENT_METHOD.WALLET;
  }

  isCod(): boolean {
    return this.method === PAYMENT_METHOD.CASH_ON_DELIVERY;
  }

  requiresGateway(): boolean {
    return this.isOnline() && !this.isCod();
  }
}
