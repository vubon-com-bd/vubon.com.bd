/**
 * SavedForLaterEntity — Aggregate Root
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { CartProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { SavedItemIdVO } from '../value-objects/primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '../value-objects/primitives/saved-item-status.vo.js';
import {
  ItemSavedForLaterEvent,
  ItemMovedToCartEvent,
  SavedItemRemovedEvent,
} from '../events/saved-for-later.events.js';

export interface SavedForLaterEntityProps {
  readonly userId: CartUserIdVO;
  readonly productId: CartProductIdVO;
  readonly variantId?: CartVariantIdVO;
  readonly quantity: number;
  readonly status: SavedItemStatusVO;
  readonly notes?: string;
}

export class SavedForLaterEntity extends AggregateRoot<string> {
  private _status: SavedItemStatusVO;
  private _quantity: number;
  private _notes?: string;
  private readonly _userId: CartUserIdVO;
  private readonly _productId: CartProductIdVO;
  private readonly _variantId?: CartVariantIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SavedForLaterEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._quantity = props.quantity;
    this._status = props.status;
    this._notes = props.notes;
    if (this._quantity <= 0 || !Number.isInteger(this._quantity)) {
      throw new ValidationError('Quantity must be a positive integer', 'quantity');
    }
  }

  get userId(): CartUserIdVO { return this._userId; }
  get productId(): CartProductIdVO { return this._productId; }
  get variantId(): CartVariantIdVO | undefined { return this._variantId; }
  get quantity(): number { return this._quantity; }
  get status(): SavedItemStatusVO { return this._status; }
  get notes(): string | undefined { return this._notes; }
  get toIdVO(): SavedItemIdVO { return SavedItemIdVO.reconstitute(this.id); }

  isActive(): boolean {
    return this._status.isActive();
  }

  canMoveToCart(): boolean {
    return this._status.isActive();
  }

  changeQuantity(qty: number, now: string): void {
    if (qty <= 0 || !Number.isInteger(qty)) {
      throw new ValidationError('Quantity must be a positive integer', 'quantity');
    }
    this._quantity = qty;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  moveToCart(cartId: string, now: string): void {
    if (!this.canMoveToCart()) {
      throw new BusinessRuleError(
        `Saved item "${this.id}" is not movable (status: ${this._status.value})`,
        'SAVED_ITEM_NOT_MOVABLE',
        { savedItemId: this.id, status: this._status.value },
      );
    }
    this._status = SavedItemStatusVO.create(SAVED_ITEM_STATUS.MOVED_TO_CART);
    this.addDomainEvent(
      new ItemMovedToCartEvent({
        aggregateId: this.id,
        payload: {
          savedItemId: this.id,
          cartId,
          productId: this._productId.value,
          quantity: this._quantity,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  remove(now: string = new Date().toISOString()): void {
    this.addDomainEvent(
      new SavedItemRemovedEvent({
        aggregateId: this.id,
        payload: {
          savedItemId: this.id,
          userId: this._userId.value,
          productId: this._productId.value,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: SavedForLaterEntityProps;
    now: string;
  }): SavedForLaterEntity {
    const entity = new SavedForLaterEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new ItemSavedForLaterEvent({
        aggregateId: params.id,
        payload: {
          savedItemId: params.id,
          userId: params.props.userId.value,
          productId: params.props.productId.value,
          variantId: params.props.variantId?.value,
          quantity: params.props.quantity,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: SavedForLaterEntityProps;
    version?: number;
  }): SavedForLaterEntity {
    const entity = new SavedForLaterEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
