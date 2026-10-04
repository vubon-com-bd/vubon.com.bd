/**
 * OrderSnapshotVO — immutable snapshot of order at a point in time
 * @module order-service/domain/value-objects/composites
 *
 * Used for:
 *  - Event sourcing (capture state before/after changes)
 *  - Audit trail
 *  - Historical reporting
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { OrderVO } from './order.vo.js';

export interface OrderSnapshotVOProps {
  readonly order: OrderVO;
  readonly version: number;
  readonly takenAt: string;
  readonly reason: string;
  readonly takenBy?: string;
}

export class OrderSnapshotVO extends BaseVO<OrderSnapshotVOProps> {
  private constructor(props: OrderSnapshotVOProps) { super(props); }

  static create(props: OrderSnapshotVOProps): OrderSnapshotVO {
    const vo = new OrderSnapshotVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderSnapshotVOProps): OrderSnapshotVO {
    return new OrderSnapshotVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.version < 0) {
      throw new ValidationError('Version cannot be negative', 'version');
    }
    if (!v.reason || v.reason.trim().length === 0) {
      throw new ValidationError('Snapshot reason cannot be empty', 'reason');
    }
    if (!v.takenAt || !Date.parse(v.takenAt)) {
      throw new ValidationError('Invalid takenAt date', 'takenAt');
    }
  }

  get order(): OrderVO { return this.value.order; }
  get version(): number { return this.value.version; }
  get takenAt(): string { return this.value.takenAt; }
  get reason(): string { return this.value.reason; }
  get takenBy(): string | undefined { return this.value.takenBy; }

  get orderId(): string {
    return this.order.id.value;
  }

  get status(): string {
    return this.order.status.value;
  }

  get total(): number {
    return this.order.total;
  }

  get itemCount(): number {
    return this.order.itemCount;
  }
}
