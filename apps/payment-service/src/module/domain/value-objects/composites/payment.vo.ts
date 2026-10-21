/**
 * Payment Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 *
 * Aggregates: PaymentId + Amount + Currency + Status + Method + Gateway refs.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

export interface PaymentVOProps {
  readonly id: PaymentIdVO;
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly status: PaymentStatusVO;
  readonly method: PaymentMethodTypeVO;
  readonly provider?: PaymentMethodProviderVO;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class PaymentVO extends BaseVO<PaymentVOProps> {
  private constructor(props: PaymentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: PaymentVOProps): PaymentVO {
    const vo = new PaymentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PaymentVOProps): PaymentVO {
    return new PaymentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.amount.currency !== v.currency.value) {
      throw new ValidationError(
        `Payment currency mismatch: amount=${v.amount.currency}, currency=${v.currency.value}`,
        'currency',
      );
    }
    if (v.method.requiresGateway() && !v.provider) {
      throw new ValidationError(
        'Payment requires a gateway provider for online methods',
        'provider',
      );
    }
  }

  get id(): PaymentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get userId(): UserIdVO { return this.value.userId; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
  get status(): PaymentStatusVO { return this.value.status; }
  get method(): PaymentMethodTypeVO { return this.value.method; }
  get provider(): PaymentMethodProviderVO | undefined { return this.value.provider; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isSuccessful(): boolean { return this.status.isSuccessful(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isRefundable(): boolean { return this.status.isRefundable(); }
  isRetryable(): boolean { return this.status.isRetryable(); }
  hasGateway(): boolean { return this.provider !== undefined; }
}
