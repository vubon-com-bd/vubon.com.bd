/**
 * OrderReturnVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ReturnIdVO } from '../primitives/return-id.vo.js';
import { ReturnReasonVO } from '../primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../primitives/return-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';
import { OrderItemIdVO } from '../primitives/order-item-id.vo.js';

export interface OrderReturnVOProps {
  readonly id: ReturnIdVO;
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly status: ReturnStatusVO;
  readonly reason: ReturnReasonVO;
  readonly itemIds: readonly OrderItemIdVO[];
  readonly images: readonly string[];
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly restockFee?: number;
  readonly currency: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly refundedAt?: string;
  readonly closedAt?: string;
}

export class OrderReturnVO extends BaseVO<OrderReturnVOProps> {
  private constructor(props: OrderReturnVOProps) { super(props); }

  static create(props: OrderReturnVOProps): OrderReturnVO {
    const vo = new OrderReturnVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderReturnVOProps): OrderReturnVO {
    return new OrderReturnVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.itemIds.length === 0) {
      throw new ValidationError('Return must reference at least one item', 'itemIds');
    }
    if (v.images.length > 5) {
      throw new ValidationError('Return cannot have more than 5 images', 'images');
    }
    if (v.refundAmount !== undefined && v.refundAmount < 0) {
      throw new ValidationError('Refund cannot be negative', 'refundAmount');
    }
    if (v.notes !== undefined && v.notes.length > 1000) {
      throw new ValidationError('Notes cannot exceed 1000 chars', 'notes');
    }
  }

  get id(): ReturnIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get status(): ReturnStatusVO { return this.value.status; }
  get reason(): ReturnReasonVO { return this.value.reason; }
  get itemIds(): readonly OrderItemIdVO[] { return this.value.itemIds; }
  get images(): readonly string[] { return this.value.images; }
  get notes(): string | undefined { return this.value.notes; }
  get refundAmount(): number | undefined { return this.value.refundAmount; }
  get restockFee(): number | undefined { return this.value.restockFee; }
  get currency(): string { return this.value.currency; }
  get requestedAt(): string { return this.value.requestedAt; }
  get approvedAt(): string | undefined { return this.value.approvedAt; }
  get pickedUpAt(): string | undefined { return this.value.pickedUpAt; }
  get receivedAt(): string | undefined { return this.value.receivedAt; }
  get refundedAt(): string | undefined { return this.value.refundedAt; }
  get closedAt(): string | undefined { return this.value.closedAt; }

  get itemCount(): number {
    return this.itemIds.length;
  }

  /** Is restocking fee applicable? */
  isFeeApplicable(): boolean {
    return this.reason.isBuyerRemorse();
  }

  /** Net refund = refundAmount − restockFee. */
  get netRefund(): number {
    const refund = this.refundAmount ?? 0;
    const fee = this.restockFee ?? 0;
    return Math.round((refund - fee) * 100) / 100;
  }

  isComplete(): boolean {
    return this.status.isRefunded() || this.status.isReplaced() || this.status.isClosed();
  }
}
