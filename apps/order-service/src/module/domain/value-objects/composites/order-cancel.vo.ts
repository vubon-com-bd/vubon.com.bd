/**
 * OrderCancelVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CancelIdVO } from '../primitives/cancel-id.vo.js';
import { CancelReasonVO } from '../primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../primitives/cancel-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface OrderCancelVOProps {
  readonly id: CancelIdVO;
  readonly orderId: OrderIdVO;
  readonly reason: CancelReasonVO;
  readonly status: CancelStatusVO;
  readonly requestedBy: string;
  readonly approvedBy?: string;
  readonly notes?: string;
  readonly requestedAt: string;
  readonly processedAt?: string;
}

export class OrderCancelVO extends BaseVO<OrderCancelVOProps> {
  private constructor(props: OrderCancelVOProps) {
    super(props);
    Object.freeze(this);
  }

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
    if (typeof v.requestedBy !== 'string' || v.requestedBy.trim().length === 0) {
      throw new ValidationError('requestedBy is required', 'requestedBy');
    }
    if (v.status.isApproved() && !v.approvedBy) {
      throw new ValidationError('Approved cancel requires approvedBy', 'approvedBy');
    }
    if (v.notes !== undefined && v.notes.length > 500) {
      throw new ValidationError('Cancel notes cannot exceed 500 chars', 'notes');
    }
  }

  // ═══ Getters ═══
  get id(): CancelIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get reason(): CancelReasonVO { return this.value.reason; }
  get status(): CancelStatusVO { return this.value.status; }
  get requestedBy(): string { return this.value.requestedBy; }
  get approvedBy(): string | undefined { return this.value.approvedBy; }
  get notes(): string | undefined { return this.value.notes; }
  get requestedAt(): string { return this.value.requestedAt; }
  get processedAt(): string | undefined { return this.value.processedAt; }

  // ═══ Business methods ═══
  isPending(): boolean { return this.status.isRequested(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  hasNotes(): boolean { return this.notes !== undefined && this.notes.length > 0; }
}
