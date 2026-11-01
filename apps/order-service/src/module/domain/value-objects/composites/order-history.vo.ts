/**
 * OrderHistoryVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Immutable audit log entry. Cannot be updated after creation.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { HistoryIdVO } from '../primitives/history-id.vo.js';
import { HistoryTypeVO } from '../primitives/history-type.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface OrderHistoryVOProps {
  readonly id: HistoryIdVO;
  readonly orderId: OrderIdVO;
  readonly type: HistoryTypeVO;
  readonly message: string;
  readonly performedBy?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export class OrderHistoryVO extends BaseVO<OrderHistoryVOProps> {
  private constructor(props: OrderHistoryVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: OrderHistoryVOProps): OrderHistoryVO {
    const vo = new OrderHistoryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderHistoryVOProps): OrderHistoryVO {
    return new OrderHistoryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.message !== 'string' || v.message.trim().length === 0) {
      throw new ValidationError('History message cannot be empty', 'message');
    }
    if (v.message.length > 2000) {
      throw new ValidationError('History message cannot exceed 2000 chars', 'message');
    }
  }

  // ═══ Getters ═══
  get id(): HistoryIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get type(): HistoryTypeVO { return this.value.type; }
  get message(): string { return this.value.message; }
  get performedBy(): string | undefined { return this.value.performedBy; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this.value.metadata; }
  get occurredAt(): string { return this.value.occurredAt; }

  // ═══ Business methods ═══
  isSystemGenerated(): boolean { return this.type.isSystemGenerated(); }
  hasPerformer(): boolean { return this.performedBy !== undefined; }
}
