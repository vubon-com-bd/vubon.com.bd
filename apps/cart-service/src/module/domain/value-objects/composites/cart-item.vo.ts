/**
 * CartItem Composite Value Object
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Line subtotal = unitPrice × quantity
 * - Discount never exceeds line subtotal
 * - Unavailable items cannot be selected for checkout
 * - Quantity must be within CART_LIMIT bounds
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartItemIdVO } from '../primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../primitives/product-id.vo.js';
import { CartVariantIdVO } from '../primitives/variant-id.vo.js';
import { CartVendorIdVO } from '../primitives/vendor-id.vo.js';

export interface CartItemProps {
  readonly id: CartItemIdVO;
  readonly productId: CartProductIdVO;
  readonly variantId?: CartVariantIdVO;
  readonly vendorId?: CartVendorIdVO;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly unitPrice: number;
  readonly compareAtPrice?: number;
  readonly quantity: CartItemQuantityVO;
  readonly discountAmount: number;
  readonly status: CartItemStatusVO;
  readonly isAvailable: boolean;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly addedAt: string;
  readonly updatedAt: string;
  readonly currency: string;
}

export class CartItemCompositeVO extends BaseVO<CartItemProps> {
  private constructor(props: CartItemProps) {
    super(props);
  }

  static create(props: CartItemProps): CartItemCompositeVO {
    if (props.unitPrice < 0) {
      throw new ValidationError('Unit price cannot be negative', 'unitPrice');
    }
    if (props.discountAmount < 0) {
      throw new ValidationError('Discount cannot be negative', 'discountAmount');
    }
    const lineTotal = props.unitPrice * props.quantity.value;
    if (props.discountAmount > lineTotal) {
      throw new ValidationError(
        `Discount ${props.discountAmount} exceeds line total ${lineTotal}`,
        'discountAmount',
      );
    }
    if (props.compareAtPrice !== undefined && props.compareAtPrice < props.unitPrice) {
      throw new ValidationError(
        'compareAtPrice cannot be less than unitPrice',
        'compareAtPrice',
      );
    }
    if (props.sku.trim().length === 0) {
      throw new ValidationError('SKU cannot be empty', 'sku');
    }
    return new CartItemCompositeVO(props);
  }

  static reconstitute(props: CartItemProps): CartItemCompositeVO {
    return new CartItemCompositeVO(props);
  }

  // Getters
  get id(): CartItemIdVO { return this.value.id; }
  get productId(): CartProductIdVO { return this.value.productId; }
  get variantId(): CartVariantIdVO | undefined { return this.value.variantId; }
  get vendorId(): CartVendorIdVO | undefined { return this.value.vendorId; }
  get sku(): string { return this.value.sku; }
  get name(): string { return this.value.name; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get unitPrice(): number { return this.value.unitPrice; }
  get compareAtPrice(): number | undefined { return this.value.compareAtPrice; }
  get quantity(): number { return this.value.quantity.value; }
  get discountAmount(): number { return this.value.discountAmount; }
  get status(): CartItemStatusVO { return this.value.status; }
  get isAvailable(): boolean { return this.value.isAvailable; }
  get currency(): string { return this.value.currency; }
  get addedAt(): string { return this.value.addedAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // Computed business values
  get lineSubtotal(): number {
    return this.round(this.value.unitPrice * this.value.quantity.value);
  }

  get lineTotal(): number {
    return this.round(this.lineSubtotal - this.value.discountAmount);
  }

  get discountPercent(): number {
    if (this.lineSubtotal === 0) return 0;
    return Math.round((this.value.discountAmount / this.lineSubtotal) * 100);
  }

  get savings(): number {
    if (!this.value.compareAtPrice) return 0;
    return this.round((this.value.compareAtPrice - this.value.unitPrice) * this.value.quantity.value);
  }

  // Business queries
  isPurchasable(): boolean {
    return this.value.isAvailable && this.value.status.isPurchasable();
  }

  canIncreaseQuantity(by: number): boolean {
    const next = this.value.quantity.value + by;
    return next <= CART_LIMIT.MAX_QUANTITY_PER_ITEM;
  }

  hasVariant(): boolean {
    return this.value.variantId !== undefined;
  }

  // Transformations (return new instance — immutable)
  withQuantity(q: CartItemQuantityVO): CartItemCompositeVO {
    return new CartItemCompositeVO({ ...this.value, quantity: q });
  }

  withStatus(s: CartItemStatusVO): CartItemCompositeVO {
    return new CartItemCompositeVO({ ...this.value, status: s });
  }

  withAvailability(available: boolean): CartItemCompositeVO {
    return new CartItemCompositeVO({ ...this.value, isAvailable: available });
  }

  withUnitPrice(price: number): CartItemCompositeVO {
    return new CartItemCompositeVO({ ...this.value, unitPrice: price });
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
