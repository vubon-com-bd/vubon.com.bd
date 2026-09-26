import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CartItemIdVO } from '../value-objects/primitives/cart-item-id.vo';
import { CartItemQuantityVO } from '../value-objects/primitives/cart-item-quantity.vo';
import { CartItemStatusVO } from '../value-objects/primitives/cart-item-status.vo';
import { CartItemNoteVO } from '../value-objects/primitives/cart-item-note.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface CartItemEntityProps {
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

export class CartItemEntity extends BaseEntity<CartItemIdVO> {
  private readonly _productId: ProductIdVO;
  private readonly _variantId: VariantIdVO | null;
  private readonly _vendorId: VendorIdVO | null;
  private readonly _quantity: CartItemQuantityVO;
  private readonly _unitPrice: number;
  private readonly _totalPrice: number;
  private readonly _currency: string;
  private readonly _status: CartItemStatusVO;
  private readonly _note: CartItemNoteVO | null;
  private readonly _selected: boolean;

  private constructor(
    id: CartItemIdVO,
    props: CartItemEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._vendorId = props.vendorId;
    this._quantity = props.quantity;
    this._unitPrice = props.unitPrice;
    this._totalPrice = props.totalPrice;
    this._currency = props.currency;
    this._status = props.status;
    this._note = props.note;
    this._selected = props.selected;
  }

  static create(props: CartItemEntityProps): CartItemEntity {
    const now = new Date().toISOString();
    const id = CartItemIdVO.create(crypto.randomUUID());
    return new CartItemEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: CartItemIdVO,
    props: CartItemEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartItemEntity {
    return new CartItemEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateQuantity(quantity: CartItemQuantityVO): CartItemEntity {
    const now = new Date().toISOString();
    const total = quantity.quantity * this._unitPrice;
    return new CartItemEntity(
      this.id,
      { ...this._toProps(), quantity, totalPrice: total },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
  }

  toggleSelection(): CartItemEntity {
    return new CartItemEntity(
      this.id,
      { ...this._toProps(), selected: !this._selected },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markAsSaved(): CartItemEntity {
    return new CartItemEntity(
      this.id,
      { ...this._toProps(), status: CartItemStatusVO.create('saved') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | null { return this._variantId; }
  get vendorId(): VendorIdVO | null { return this._vendorId; }
  get quantity(): CartItemQuantityVO { return this._quantity; }
  get unitPrice(): number { return this._unitPrice; }
  get totalPrice(): number { return this._totalPrice; }
  get currency(): string { return this._currency; }
  get status(): CartItemStatusVO { return this._status; }
  get note(): CartItemNoteVO | null { return this._note; }
  get selected(): boolean { return this._selected; }

  private _toProps(): CartItemEntityProps {
    return {
      productId: this._productId,
      variantId: this._variantId,
      vendorId: this._vendorId,
      quantity: this._quantity,
      unitPrice: this._unitPrice,
      totalPrice: this._totalPrice,
      currency: this._currency,
      status: this._status,
      note: this._note,
      selected: this._selected,
    };
  }
}
