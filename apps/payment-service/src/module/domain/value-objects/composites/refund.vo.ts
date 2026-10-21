/**
 * Refund Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export interface RefundVOProps {
  readonly id: RefundIdVO;
  readonly paymentId: PaymentIdVO;
  readonly amount: RefundAmountVO;
  readonly reason: RefundReasonVO;
  readonly status: RefundStatusVO;
  readonly requestedBy?: string;
  readonly approvedBy?: string;
  readonly completedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RefundVO extends BaseVO<RefundVOProps> {
  private constructor(props: RefundVOProps) {
    super(props);
    Object.freeze(this);
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
    if (v.status.isCompleted() && !v.completedAt) {
      throw new ValidationError('Completed refund requires completedAt', 'completedAt');
    }
    if (v.status.isApproved() && !v.approvedBy) {
      throw new ValidationError('Approved refund requires approvedBy', 'approvedBy');
    }
  }

  get id(): RefundIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get amount(): RefundAmountVO { return this.value.amount; }
  get reason(): RefundReasonVO { return this.value.reason; }
  get status(): RefundStatusVO { return this.value.status; }
  get requestedBy(): string | undefined { return this.value.requestedBy; }
  get approvedBy(): string | undefined { return this.value.approvedBy; }
  get completedAt(): string | undefined { return this.value.completedAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isCompleted(): boolean { return this.status.isCompleted(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isRetryable(): boolean { return this.status.isRetryable(); }
}
