/**
 * CartItemVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartItemIdVO } from '../primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../primitives/cart-item-status.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';

export interface CartItemVOProps {
  readonly id: CartItemIdVO;
  readonly productId: ProductIdVO;
  readonly quantity: CartItemQuantityVO;
  readonly status: CartItemStatusVO;
  readonly unitPrice: number;
  readonly currency: string;
  readonly addedAt: string;
}

export class CartItemVO extends BaseVO<CartItemVOProps> {
  private constructor(props: CartItemVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartItemVOProps): CartItemVO {
    const vo = new CartItemVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartItemVOProps): CartItemVO {
    return new CartItemVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isFinite(v.unitPrice) || v.unitPrice < 0) {
      throw new ValidationError('unitPrice must be non-negative', 'unitPrice');
    }
    if (typeof v.currency !== 'string' || v.currency.length < 3) {
      throw new ValidationError('currency must be a valid code', 'currency');
    }
  }

  get id(): CartItemIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get quantity(): CartItemQuantityVO { return this.value.quantity; }
  get status(): CartItemStatusVO { return this.value.status; }
  get unitPrice(): number { return this.value.unitPrice; }
  get currency(): string { return this.value.currency; }
  get addedAt(): string { return this.value.addedAt; }

  get subtotal(): number {
    return Math.round(this.value.unitPrice * this.value.quantity.value * 100) / 100;
  }

  isPurchasable(): boolean { return this.status.isPurchasable(); }
  isActive(): boolean { return this.status.isActiveStatus(); }
}
