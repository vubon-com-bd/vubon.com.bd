/**
 * OrderCancelVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CancelIdVO } from '../primitives/cancel-id.vo.js';
import { CancelReasonVO } from '../primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../primitives/cancel-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';

export interface OrderCancelVOProps {
  readonly id: CancelIdVO;
  readonly orderId: OrderIdVO;
  readonly reason: CancelReasonVO;
  readonly status: CancelStatusVO;
  readonly requestedBy: CustomerIdVO;
  readonly approvedBy?: CustomerIdVO;
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly currency: string;
  readonly restockInventory: boolean;
  readonly requestedAt: string;
  readonly processedAt?: string;
}

export class OrderCancelVO extends BaseVO<OrderCancelVOProps> {
  private constructor(props: OrderCancelVOProps) { super(props); }

  static create(props: OrderCancelVOProps): OrderCancelVO {
    const vo = new OrderCancelVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderCancelVOProps): OrderCancelVO {
    return new OrderCancelVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.refundAmount !== undefined && v.refundAmount < 0) {
      throw new ValidationError('Refund amount cannot be negative', 'refundAmount');
    }
    if (v.notes !== undefined && v.notes.length > 500) {
      throw new ValidationError('Notes cannot exceed 500 chars', 'notes');
    }
    if (v.status.isApproved() && !v.approvedBy) {
      throw new ValidationError('Approved cancel must have approvedBy', 'approvedBy');
    }
  }

  get id(): CancelIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get reason(): CancelReasonVO { return this.value.reason; }
  get status(): CancelStatusVO { return this.value.status; }
  get requestedBy(): CustomerIdVO { return this.value.requestedBy; }
  get approvedBy(): CustomerIdVO | undefined { return this.value.approvedBy; }
  get notes(): string | undefined { return this.value.notes; }
  get refundAmount(): number | undefined { return this.value.refundAmount; }
  get currency(): string { return this.value.currency; }
  get restockInventory(): boolean { return this.value.restockInventory; }
  get requestedAt(): string { return this.value.requestedAt; }
  get processedAt(): string | undefined { return this.value.processedAt; }

  hasRefund(): boolean {
    return this.refundAmount !== undefined && this.refundAmount > 0;
  }

  isPending(): boolean {
    return this.status.isRequested();
  }

  isFinalized(): boolean {
    return this.status.isFinal();
  }
}
