/**
 * OrderReturnVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ReturnIdVO } from '../primitives/return-id.vo.js';
import { ReturnReasonVO } from '../primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../primitives/return-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';

export interface OrderReturnVOProps {
  readonly id: ReturnIdVO;
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly reason: ReturnReasonVO;
  readonly status: ReturnStatusVO;
  readonly itemIds: readonly string[];
  readonly notes?: string;
  readonly imageUrls?: readonly string[];
  readonly requestedAt: string;
}

export class OrderReturnVO extends BaseVO<OrderReturnVOProps> {
  private constructor(props: OrderReturnVOProps) {
    super(props);
    Object.freeze(this);
  }

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
    if (!Array.isArray(v.itemIds) || v.itemIds.length === 0) {
      throw new ValidationError('Return must have at least one item', 'itemIds');
    }
    if (v.notes !== undefined && v.notes.length > 1000) {
      throw new ValidationError('Return notes cannot exceed 1000 chars', 'notes');
    }
    if (v.imageUrls !== undefined && v.imageUrls.length > 5) {
      throw new ValidationError('Return images cannot exceed 5', 'imageUrls');
    }
  }

  // ═══ Getters ═══
  get id(): ReturnIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get reason(): ReturnReasonVO { return this.value.reason; }
  get status(): ReturnStatusVO { return this.value.status; }
  get itemIds(): readonly string[] { return this.value.itemIds; }
  get notes(): string | undefined { return this.value.notes; }
  get imageUrls(): readonly string[] | undefined { return this.value.imageUrls; }
  get requestedAt(): string { return this.value.requestedAt; }

  // ═══ Business methods ═══
  isPending(): boolean { return this.status.isRequested(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  get itemCount(): number { return this.itemIds.length; }
  hasImages(): boolean { return this.imageUrls !== undefined && this.imageUrls.length > 0; }
}
