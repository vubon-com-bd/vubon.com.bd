/**
 * PaymentVO — full aggregate snapshot of a payment
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PaymentIdVO } from '../primitives/payment-id.vo.js';
import { PaymentStatusVO } from '../primitives/payment-status.vo.js';
import { PaymentTypeVO } from '../primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../primitives/payment-gateway.vo.js';
import { PaymentAmountVO } from '../primitives/payment-amount.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../primitives/gateway-payment-id.vo.js';
import { IdempotencyKeyVO } from '../primitives/idempotency-key.vo.js';

export interface PaymentVOProps {
  readonly id: PaymentIdVO;
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly type: PaymentTypeVO;
  readonly status: PaymentStatusVO;
  readonly method: PaymentMethodVO;
  readonly gateway?: PaymentGatewayVO;
  readonly amount: PaymentAmountVO;
  readonly gatewayPaymentId?: GatewayPaymentIdVO;
  readonly idempotencyKey?: IdempotencyKeyVO;
  readonly refundedAmount?: number;
  readonly authorizedAt?: string;
  readonly capturedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class PaymentVO extends BaseVO<PaymentVOProps> {
  private constructor(props: PaymentVOProps) {
    super(props);
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
    if (v.refundedAmount !== undefined) {
      if (v.refundedAmount < 0) {
        throw new ValidationError('Refunded amount cannot be negative', 'refundedAmount');
      }
      if (v.refundedAmount > v.amount.amount) {
        throw new ValidationError(
          'Refunded amount cannot exceed paid amount',
          'refundedAmount',
        );
      }
    }
    if (v.capturedAt && v.authorizedAt && v.capturedAt < v.authorizedAt) {
      throw new ValidationError('capturedAt cannot be before authorizedAt', 'capturedAt');
    }
  }

  get id(): PaymentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): PaymentTypeVO { return this.value.type; }
  get status(): PaymentStatusVO { return this.value.status; }
  get method(): PaymentMethodVO { return this.value.method; }
  get gateway(): PaymentGatewayVO | undefined { return this.value.gateway; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): string { return this.value.amount.currency; }
  get gatewayPaymentId(): GatewayPaymentIdVO | undefined { return this.value.gatewayPaymentId; }
  get idempotencyKey(): IdempotencyKeyVO | undefined { return this.value.idempotencyKey; }
  get refundedAmount(): number { return this.value.refundedAmount ?? 0; }
  get authorizedAt(): string | undefined { return this.value.authorizedAt; }
  get capturedAt(): string | undefined { return this.value.capturedAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isPaid(): boolean {
    return this.status.isSettled();
  }

  isRefundable(): boolean {
    return this.status.isSettled() && this.refundableRemaining() > 0;
  }

  refundableRemaining(): number {
    return Math.round((this.value.amount.amount - this.refundedAmount) * 100) / 100;
  }

  refundableRemainingAmount(): PaymentAmountVO {
    return PaymentAmountVO.create(this.refundableRemaining(), this.currency);
  }

  isFullyRefunded(): boolean {
    return this.refundedAmount >= this.value.amount.amount;
  }

  isPartiallyRefunded(): boolean {
    return this.refundedAmount > 0 && !this.isFullyRefunded();
  }
}
