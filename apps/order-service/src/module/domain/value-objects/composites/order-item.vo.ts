/**
 * OrderItemVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Snapshot of item at purchase time (price cannot change).
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OrderItemIdVO } from '../primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../primitives/order-item-status.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface OrderItemVOProps {
  readonly id: OrderItemIdVO;
  readonly orderId: OrderIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly vendorId?: VendorIdVO;
  readonly name: string;
  readonly sku: string;
  readonly quantity: OrderItemQuantityVO;
  readonly unitPrice: OrderItemPriceVO;
  readonly status: OrderItemStatusVO;
}

export class OrderItemVO extends BaseVO<OrderItemVOProps> {
  private constructor(props: OrderItemVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: OrderItemVOProps): OrderItemVO {
    const vo = new OrderItemVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderItemVOProps): OrderItemVO {
    return new OrderItemVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.name !== 'string' || v.name.trim().length === 0) {
      throw new ValidationError('OrderItem name cannot be empty', 'name');
    }
    if (typeof v.sku !== 'string' || v.sku.trim().length === 0) {
      throw new ValidationError('OrderItem sku cannot be empty', 'sku');
    }
    if (v.unitPrice.currency !== v.unitPrice.currency) {
      throw new ValidationError('OrderItem currency mismatch', 'currency');
    }
  }

  // ═══ Getters ═══
  get id(): OrderItemIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | undefined { return this.value.variantId; }
  get vendorId(): VendorIdVO | undefined { return this.value.vendorId; }
  get name(): string { return this.value.name; }
  get sku(): string { return this.value.sku; }
  get quantity(): OrderItemQuantityVO { return this.value.quantity; }
  get unitPrice(): OrderItemPriceVO { return this.value.unitPrice; }
  get status(): OrderItemStatusVO { return this.value.status; }

  // ═══ Business methods ═══
  get lineTotal(): OrderItemPriceVO {
    return this.unitPrice.multiply(this.quantity.value);
  }

  isCancellable(): boolean { return this.status.isCancellable(); }
  isReturnable(): boolean { return this.status.isReturnable(); }
  hasVariant(): boolean { return this.variantId !== undefined; }
}
