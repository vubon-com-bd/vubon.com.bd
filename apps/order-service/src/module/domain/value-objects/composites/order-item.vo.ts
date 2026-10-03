/**
 * OrderItemVO — composite value object for a single order line
 * @module order-service/domain/value-objects/composites
 *
 * Immutable snapshot — captures item state at purchase time.
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

export interface OrderItemVOProps {
  readonly id: OrderItemIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly vendorId?: VendorIdVO;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly type: string;
  readonly status: OrderItemStatusVO;
  readonly quantity: OrderItemQuantityVO;
  readonly price: OrderItemPriceVO;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly notes?: string;
}

export class OrderItemVO extends BaseVO<OrderItemVOProps> {
  private constructor(props: OrderItemVOProps) { super(props); }

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
    if (!v.sku || v.sku.trim().length === 0) {
      throw new ValidationError('SKU cannot be empty', 'sku');
    }
    if (v.sku.length > 64) {
      throw new ValidationError('SKU cannot exceed 64 chars', 'sku');
    }
    if (!v.name || v.name.trim().length === 0) {
      throw new ValidationError('Item name cannot be empty', 'name');
    }
    if (v.name.length > 200) {
      throw new ValidationError('Item name cannot exceed 200 chars', 'name');
    }
    if (v.discountAmount < 0) {
      throw new ValidationError('Discount cannot be negative', 'discountAmount');
    }
    if (v.taxAmount < 0) {
      throw new ValidationError('Tax cannot be negative', 'taxAmount');
    }
    if (v.shippingAmount < 0) {
      throw new ValidationError('Shipping cannot be negative', 'shippingAmount');
    }
    // Discount cannot exceed line subtotal
    if (v.discountAmount > this.lineSubtotal) {
      throw new ValidationError(
        `Discount ${v.discountAmount} exceeds line subtotal ${this.lineSubtotal}`,
        'discountAmount',
      );
    }
  }

  get id(): OrderItemIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | undefined { return this.value.variantId; }
  get vendorId(): VendorIdVO | undefined { return this.value.vendorId; }
  get sku(): string { return this.value.sku; }
  get name(): string { return this.value.name; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get type(): string { return this.value.type; }
  get status(): OrderItemStatusVO { return this.value.status; }
  get quantity(): OrderItemQuantityVO { return this.value.quantity; }
  get price(): OrderItemPriceVO { return this.value.price; }
  get discountAmount(): number { return this.value.discountAmount; }
  get taxAmount(): number { return this.value.taxAmount; }
  get shippingAmount(): number { return this.value.shippingAmount; }
  get attributes(): Readonly<Record<string, string>> | undefined { return this.value.attributes; }
  get notes(): string | undefined { return this.value.notes; }
  get currency(): string { return this.value.price.currency; }

  /** Unit price × quantity, before any discount. */
  get lineSubtotal(): number {
    return Math.round(this.price.amount * this.quantity.value * 100) / 100;
  }

  /** lineSubtotal − discount + tax + shipping. */
  get lineTotal(): number {
    const t = this.lineSubtotal - this.discountAmount + this.taxAmount + this.shippingAmount;
    return Math.round(t * 100) / 100;
  }

  /** True if this item can still be cancelled/returned. */
  isRefundable(): boolean {
    return !this.status.isFinal() || this.status.isReturned();
  }

  /** True if item is fully shipped or delivered. */
  isShippedOrLater(): boolean {
    return this.status.isShipped() || this.status.isDelivered();
  }

  hasVariant(): boolean {
    return this.variantId !== undefined;
  }

  hasDiscount(): boolean {
    return this.discountAmount > 0 || this.price.hasDiscount();
  }
}
