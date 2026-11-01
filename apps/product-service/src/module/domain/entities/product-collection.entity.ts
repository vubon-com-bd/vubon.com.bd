/**
 * ProductCollectionEntity — Aggregate Root (standalone)
 * @module product-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { ProductCollectionVO } from '../value-objects/composites/product-collection.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import {
  CollectionCreatedEvent,
  CollectionProductAddedEvent,
  CollectionProductRemovedEvent,
  CollectionActivatedEvent,
  CollectionDeactivatedEvent,
  CollectionDeletedEvent,
} from '../events/product-collection.events.js';

export class ProductCollectionEntity extends AggregateRoot<string> {
  private _vo: ProductCollectionVO;
  private _isActive: boolean;
  private _deletedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductCollectionVO,
    isActive: boolean,
    deletedBy?: string,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
    this._isActive = isActive;
    this._deletedBy = deletedBy;
  }

  get vo(): ProductCollectionVO { return this._vo; }
  get collectionId(): ProductCollectionVO['id'] { return this._vo.id; }
  get name(): ProductCollectionVO['name'] { return this._vo.name; }
  get slug(): string { return this._vo.slug; }
  get type(): ProductCollectionVO['type'] { return this._vo.type; }
  get productCount(): number { return this._vo.productCount; }
  get isActive(): boolean { return this._isActive; }
  get deletedBy(): string | undefined { return this._deletedBy; }

  hasProducts(): boolean { return this._vo.hasProducts(); }
  contains(productId: ProductIdVO): boolean { return this._vo.contains(productId); }

  addProduct(productId: ProductIdVO, now: string = new Date().toISOString()): void {
    if (!this._isActive) {
      throw new BusinessRuleError(
        `Cannot add product to inactive collection "${this.id}"`,
        'COLLECTION_INACTIVE',
        { collectionId: this.id },
      );
    }
    if (this.contains(productId)) return;

    this._vo = this._vo.withProduct(productId);
    this.addDomainEvent(
      new CollectionProductAddedEvent({
        aggregateId: this.id,
        payload: {
          collectionId: this.id,
          productId: productId.value,
          totalProducts: this._vo.productCount,
          addedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  removeProduct(productId: ProductIdVO, now: string = new Date().toISOString()): void {
    if (!this.contains(productId)) return;

    this._vo = this._vo.withoutProduct(productId);
    this.addDomainEvent(
      new CollectionProductRemovedEvent({
        aggregateId: this.id,
        payload: {
          collectionId: this.id,
          productId: productId.value,
          totalProducts: this._vo.productCount,
          removedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  activate(now: string = new Date().toISOString()): void {
    if (this._isActive) return;
    this._isActive = true;
    this.addDomainEvent(
      new CollectionActivatedEvent({
        aggregateId: this.id,
        payload: { collectionId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    if (!this._isActive) return;
    this._isActive = false;
    this.addDomainEvent(
      new CollectionDeactivatedEvent({
        aggregateId: this.id,
        payload: { collectionId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  delete(deletedBy?: string, now: string = new Date().toISOString()): void {
    if (this.deletedAt) return;
    this._deletedBy = deletedBy;
    (this as unknown as { deletedAt: string | null }).deletedAt = now;
    this.addDomainEvent(
      new CollectionDeletedEvent({
        aggregateId: this.id,
        payload: { collectionId: this.id, deletedAt: now, deletedBy },
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
    id: string;
    vo: ProductCollectionVO;
    now: string;
  }): ProductCollectionEntity {
    const entity = new ProductCollectionEntity(
      params.id,
      params.now,
      params.now,
      params.vo,
      true,
      undefined,
      null,
    );

    entity.addDomainEvent(
      new CollectionCreatedEvent({
        aggregateId: params.id,
        payload: {
          collectionId: params.id,
          name: params.vo.name.value,
          slug: params.vo.slug,
          type: params.vo.type.value,
          createdAt: params.now,
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
    vo: ProductCollectionVO;
    isActive: boolean;
    deletedBy?: string;
    version?: number;
  }): ProductCollectionEntity {
    const entity = new ProductCollectionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.isActive,
      params.deletedBy,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
