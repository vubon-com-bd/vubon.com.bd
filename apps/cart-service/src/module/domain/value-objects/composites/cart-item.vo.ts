import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartItemIdVO } from '../primitives/cart-item-id.vo';
import { CartItemQuantityVO } from '../primitives/cart-item-quantity.vo';
import { CartItemStatusVO } from '../primitives/cart-item-status.vo';
import { CartItemNoteVO } from '../primitives/cart-item-note.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { VariantIdVO } from '../primitives/variant-id.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface CartItemVOProps {
  readonly id: CartItemIdVO;
  readonly productId: ProductIdVO;
  readonly variantId: VariantIdVO | null;
  readonly vendorId: VendorIdVO | null;
  readonly quantity: CartItemQuantityVO;
  readonly unitPrice: number;
  readonly totalPrice: number;
  readonly currency: string;
  readonly status: CartItemStatusVO;
  readonly note: CartItemNoteVO | null;
  readonly selected: boolean;
}

export class CartItemVO extends BaseVO<CartItemVOProps> {
  private constructor(props: CartItemVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartItemVOProps): CartItemVO {
    return new CartItemVO(props);
  }

  get id(): CartItemIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | null { return this.value.variantId; }
  get vendorId(): VendorIdVO | null { return this.value.vendorId; }
  get quantity(): CartItemQuantityVO { return this.value.quantity; }
  get unitPrice(): number { return this.value.unitPrice; }
  get totalPrice(): number { return this.value.totalPrice; }
  get currency(): string { return this.value.currency; }
  get status(): CartItemStatusVO { return this.value.status; }
  get note(): CartItemNoteVO | null { return this.value.note; }
  get selected(): boolean { return this.value.selected; }
}
