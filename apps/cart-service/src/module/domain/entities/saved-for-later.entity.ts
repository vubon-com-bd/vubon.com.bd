/**
 * SavedForLaterEntity — Aggregate Root (independent)
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { SavedItemIdVO } from '../value-objects/primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '../value-objects/primitives/saved-item-status.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

import {
  SavedForLaterItemSavedEvent,
  SavedForLaterItemMovedEvent,
  SavedForLaterItemRemovedEvent,
  SavedForLaterStatusChangedEvent,
} from '../events/saved-for-later.events.js';

export interface SavedForLaterEntityProps {
  readonly userId: UserIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly note?: string;
  readonly savedAt: string;
}

export class SavedForLaterEntity extends AggregateRoot<string> {
  private _status: SavedItemStatusVO;
  private _note?: string;

  private readonly _userId: UserIdVO;
  private readonly _productId: ProductIdVO;
  private readonly _variantId?: VariantIdVO;
  private readonly _savedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SavedForLaterEntityProps,
    status: SavedItemStatusVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._note = props.note;
    this._savedAt = props.savedAt;
    this._status = status;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._note !== undefined && this._note.length > 500) {
      throw new ValidationError('note exceeds 500 chars', 'note');
    }
  }

  get userId(): UserIdVO { return this._userId; }
  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | undefined { return this._variantId; }
  get status(): SavedItemStatusVO { return this._status; }
  get note(): string | undefined { return this._note; }
  get savedAt(): string { return this._savedAt; }

  get toIdVO(): SavedItemIdVO {
    return SavedItemIdVO.reconstitute(this.id);
  }

  isActive(): boolean { return this._status.isActiveStatus(); }
  isRemoved(): boolean { return this._status.isRemoved(); }
  isMovedToCart(): boolean { return this._status.isMovedToCart(); }
  isFinal(): boolean { return this._status.isFinal(); }

  canMoveToCart(): boolean {
    return this._status.canMoveToCart();
  }

  // Business Actions
  updateNote(note: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update note in status "${this._status.value}"`,
        'SAVED_ITEM_NOT_ACTIVE',
        { itemId: this.id, status: this._status.value },
      );
    }
    if (note.length > 500) {
      throw new ValidationError('note exceeds 500 chars', 'note');
    }
    this._note = note;
    this.touch(now);
  }

  moveToCart(now: string = new Date().toISOString()): void {
    if (!this.canMoveToCart()) {
      throw new BusinessRuleError(
        `Saved item cannot be moved to cart in status "${this._status.value}"`,
        'SAVED_ITEM_CANNOT_MOVE',
        { itemId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = SavedItemStatusVO.create('moved_to_cart');
    this.addDomainEvent(
      new SavedForLaterItemMovedEvent({
        aggregateId: this.id,
        payload: { savedItemId: this.id, cartId: '', itemId: '' },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new SavedForLaterStatusChangedEvent({
        aggregateId: this.id,
        payload: { savedItemId: this.id, fromStatus: from, toStatus: 'moved_to_cart' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  remove(now: string = new Date().toISOString()): void {
    if (this.isRemoved()) return;
    const from = this._status.value;
    this._status = SavedItemStatusVO.create('removed');
    this.addDomainEvent(
      new SavedForLaterItemRemovedEvent({
        aggregateId: this.id,
        payload: { savedItemId: this.id },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new SavedForLaterStatusChangedEvent({
        aggregateId: this.id,
        payload: { savedItemId: this.id, fromStatus: from, toStatus: 'removed' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: SavedItemIdVO;
    props: SavedForLaterEntityProps;
    now: string;
  }): SavedForLaterEntity {
    const entity = new SavedForLaterEntity(
      params.id.value,
      params.now,
      params.now,
      params.props,
      SavedItemStatusVO.active(),
    );
    entity.addDomainEvent(
      new SavedForLaterItemSavedEvent({
        aggregateId: params.id.value,
        payload: {
          savedItemId: params.id.value,
          cartId: '',
          productId: params.props.productId.value,
          savedAt: params.props.savedAt,
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
    status: string;
    props: SavedForLaterEntityProps;
    version?: number;
  }): SavedForLaterEntity {
    const entity = new SavedForLaterEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      SavedItemStatusVO.reconstitute(params.status),
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
