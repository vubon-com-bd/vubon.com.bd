/**
 * OrderSnapshotVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Complete immutable snapshot of an order for auditing / replay / archival.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OrderVO } from './order.vo.js';
import { OrderItemVO } from './order-item.vo.js';
import { ShippingAddressVO } from './shipping-address.vo.js';
import { BillingAddressVO } from './billing-address.vo.js';

export interface OrderSnapshotVOProps {
  readonly order: OrderVO;
  readonly items: readonly OrderItemVO[];
  readonly shippingAddress: ShippingAddressVO;
  readonly billingAddress?: BillingAddressVO;
  readonly snapshotAt: string;
}

export class OrderSnapshotVO extends BaseVO<OrderSnapshotVOProps> {
  private constructor(props: OrderSnapshotVOProps) {
    super(props);
    Object.freeze(this);
  }

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
    if (!Array.isArray(v.items) || v.items.length === 0) {
      throw new ValidationError('Snapshot must contain at least one item', 'items');
    }
    if (typeof v.snapshotAt !== 'string' || v.snapshotAt.length === 0) {
      throw new ValidationError('snapshotAt is required', 'snapshotAt');
    }
    // Items currency consistency check
    const currency = v.order.total.currency;
    for (const item of v.items) {
      if (item.unitPrice.currency !== currency) {
        throw new ValidationError(
          `Item currency "${item.unitPrice.currency}" does not match order currency "${currency}"`,
          'currency',
        );
      }
    }
  }

  // ═══ Getters ═══
  get order(): OrderVO { return this.value.order; }
  get items(): readonly OrderItemVO[] { return this.value.items; }
  get shippingAddress(): ShippingAddressVO { return this.value.shippingAddress; }
  get billingAddress(): BillingAddressVO | undefined { return this.value.billingAddress; }
  get snapshotAt(): string { return this.value.snapshotAt; }

  // ═══ Business methods ═══
  get itemCount(): number { return this.items.length; }
  hasBillingAddress(): boolean { return this.billingAddress !== undefined; }
  hasItems(): boolean { return this.items.length > 0; }
}
