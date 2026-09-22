import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SavedItemIdVO } from '../value-objects/primitives/saved-item-id.vo';
import { SavedItemStatusVO } from '../value-objects/primitives/saved-item-status.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  ItemSavedForLaterEvent,
  ItemMovedToCartEvent,
} from '../events/saved-for-later.events';

export interface SavedForLaterEntityProps {
  readonly userId: UserIdVO;
  readonly productId: ProductIdVO;
  readonly variantId: VariantIdVO | null;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly status: SavedItemStatusVO;
}

export class SavedForLaterEntity extends AggregateRoot<SavedItemIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _productId: ProductIdVO;
  private readonly _variantId: VariantIdVO | null;
  private readonly _quantity: number;
  private readonly _unitPrice: number;
  private readonly _currency: string;
  private readonly _status: SavedItemStatusVO;

  private constructor(
    id: SavedItemIdVO,
    props: SavedForLaterEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._quantity = props.quantity;
    this._unitPrice = props.unitPrice;
    this._currency = props.currency;
    this._status = props.status;
  }

  static create(props: SavedForLaterEntityProps): SavedForLaterEntity {
    const now = new Date().toISOString();
    const id = SavedItemIdVO.create(crypto.randomUUID());
    const entity = new SavedForLaterEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ItemSavedForLaterEvent(id.value, props.userId.value, props.productId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: SavedItemIdVO,
    props: SavedForLaterEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SavedForLaterEntity {
    return new SavedForLaterEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  moveToCart(): SavedForLaterEntity {
    const now = new Date().toISOString();
    const updated = new SavedForLaterEntity(
      this.id,
      { ...this._toProps(), status: SavedItemStatusVO.create('moved_to_cart') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ItemMovedToCartEvent(this.id.value, this._userId.value, this._productId.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | null { return this._variantId; }
  get quantity(): number { return this._quantity; }
  get unitPrice(): number { return this._unitPrice; }
  get currency(): string { return this._currency; }
  get status(): SavedItemStatusVO { return this._status; }

  private _toProps(): SavedForLaterEntityProps {
    return {
      userId: this._userId,
      productId: this._productId,
      variantId: this._variantId,
      quantity: this._quantity,
      unitPrice: this._unitPrice,
      currency: this._currency,
      status: this._status,
    };
  }
}
