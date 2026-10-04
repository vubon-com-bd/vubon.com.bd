/**
 * RefundVO — snapshot of a refund
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RefundIdVO } from '../primitives/refund-id.vo.js';
import { RefundStatusVO } from '../primitives/refund-status.vo.js';
import { RefundReasonVO } from '../primitives/refund-reason.vo.js';
import { PaymentIdVO } from '../primitives/payment-id.vo.js';
import { PaymentAmountVO } from '../primitives/payment-amount.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface RefundVOProps {
  readonly id: RefundIdVO;
  readonly paymentId: PaymentIdVO;
  readonly orderId?: OrderIdVO;
  readonly status: RefundStatusVO;
  readonly amount: PaymentAmountVO;
  readonly reason?: RefundReasonVO;
  readonly processedAt?: string;
  readonly failedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RefundVO extends BaseVO<RefundVOProps> {
  private constructor(props: RefundVOProps) {
    super(props);
  }

  static create(props: RefundVOProps): RefundVO {
    const vo = new RefundVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: RefundVOProps): RefundVO {
    return new RefundVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.amount.amount <= 0) {
      throw new ValidationError('Refund amount must be positive', 'amount');
    }
    if (v.status.isSuccess() && !v.processedAt) {
      throw new ValidationError(
        'Successful refund must have processedAt timestamp',
        'processedAt',
      );
    }
    if (v.status.value === 'failed' && !v.failedAt) {
      throw new ValidationError('Failed refund must have failedAt timestamp', 'failedAt');
    }
  }

  get id(): RefundIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get orderId(): OrderIdVO | undefined { return this.value.orderId; }
  get status(): RefundStatusVO { return this.value.status; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): string { return this.value.amount.currency; }
  get reason(): RefundReasonVO | undefined { return this.value.reason; }
  get processedAt(): string | undefined { return this.value.processedAt; }
  get failedAt(): string | undefined { return this.value.failedAt; }
  get createdAt(): string { return this.value.createdAt; }

  isSuccess(): boolean { return this.value.status.isSuccess(); }
  isPending(): boolean { return this.value.status.value === 'pending'; }
  isFailed(): boolean { return this.value.status.value === 'failed'; }
}
