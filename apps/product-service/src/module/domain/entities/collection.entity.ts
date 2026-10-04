/**
 * CollectionEntity — Aggregate Root
 * @module product-service/domain/entities
 *
 * Business rules:
 * - MAX_PRODUCTS limit enforced
 * - startAt < endAt
 * - Only ACTIVE within schedule window is live
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import {
  COLLECTION,
  COLLECTION_STATUS,
  COLLECTION_TYPE,
} from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CollectionIdVO } from '../value-objects/primitives/collection-id.vo.js';
import { CollectionNameVO } from '../value-objects/primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../value-objects/primitives/collection-slug.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export interface CollectionEntityProps {
  readonly name: CollectionNameVO;
  readonly slug: CollectionSlugVO;
  readonly description?: string;
  readonly type: string;
  readonly status: string;
  readonly imageUrl?: string;
  readonly bannerUrl?: string;
  readonly productIds: readonly string[];
  readonly isFeatured: boolean;
  readonly sortOrder: number;
  readonly startAt?: string;
  readonly endAt?: string;
}

export class CollectionEntity extends AggregateRoot<string> {
  private _name: CollectionNameVO;
  private _slug: CollectionSlugVO;
  private _description?: string;
  private _type: string;
  private _status: string;
  private _imageUrl?: string;
  private _bannerUrl?: string;
  private _productIds: readonly string[];
  private _isFeatured: boolean;
  private _sortOrder: number;
  private _startAt?: string;
  private _endAt?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CollectionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._description = props.description;
    this._type = props.type;
    this._status = props.status;
    this._imageUrl = props.imageUrl;
    this._bannerUrl = props.bannerUrl;
    this._productIds = Object.freeze([...props.productIds]);
    this._isFeatured = props.isFeatured;
    this._sortOrder = props.sortOrder;
    this._startAt = props.startAt;
    this._endAt = props.endAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!(Object.values(COLLECTION_TYPE) as readonly string[]).includes(this._type)) {
      throw new ValidationError(`Invalid collection type: ${this._type}`, 'type');
    }
    if (this._productIds.length > COLLECTION.MAX_PRODUCTS) {
      throw new BusinessRuleError(
        `Collection cannot hold more than ${COLLECTION.MAX_PRODUCTS} products`,
        'COLLECTION_LIMIT_EXCEEDED',
      );
    }
    if (this._description && this._description.length > COLLECTION.DESCRIPTION_MAX_LENGTH) {
      throw new ValidationError('Description too long', 'description');
    }
    if (this._startAt && this._endAt) {
      if (new Date(this._startAt) >= new Date(this._endAt)) {
        throw new ValidationError('startAt must be before endAt', 'schedule');
      }
    }
    if (this._sortOrder < 0) {
      throw new ValidationError('sortOrder cannot be negative', 'sortOrder');
    }
  }

  // Getters
  get name(): CollectionNameVO { return this._name; }
  get slug(): CollectionSlugVO { return this._slug; }
  get description(): string | undefined { return this._description; }
  get type(): string { return this._type; }
  get status(): string { return this._status; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get bannerUrl(): string | undefined { return this._bannerUrl; }
  get productIds(): readonly string[] { return this._productIds; }
  get isFeatured(): boolean { return this._isFeatured; }
  get sortOrder(): number { return this._sortOrder; }
  get startAt(): string | undefined { return this._startAt; }
  get endAt(): string | undefined { return this._endAt; }
  get productCount(): number { return this._productIds.length; }

  // Business methods
  public update(
    changes: {
      name?: CollectionNameVO;
      description?: string;
      imageUrl?: string;
      bannerUrl?: string;
      isFeatured?: boolean;
      sortOrder?: number;
      startAt?: string;
      endAt?: string;
    },
    changedBy: string,
  ): void {
    const changedFields: string[] = [];

    if (changes.name && !changes.name.equals(this._name)) {
      this._name = changes.name;
      changedFields.push('name');
    }
    if (changes.description !== undefined) {
      this._description = changes.description;
      changedFields.push('description');
    }
    if (changes.imageUrl !== undefined) { this._imageUrl = changes.imageUrl; changedFields.push('imageUrl'); }
    if (changes.bannerUrl !== undefined) { this._bannerUrl = changes.bannerUrl; changedFields.push('bannerUrl'); }
    if (changes.isFeatured !== undefined) { this._isFeatured = changes.isFeatured; changedFields.push('isFeatured'); }
    if (changes.sortOrder !== undefined) {
      if (changes.sortOrder < 0) throw new ValidationError('sortOrder negative', 'sortOrder');
      this._sortOrder = changes.sortOrder;
      changedFields.push('sortOrder');
    }
    if (changes.startAt !== undefined || changes.endAt !== undefined) {
      const newStart = changes.startAt ?? this._startAt;
      const newEnd = changes.endAt ?? this._endAt;
      if (newStart && newEnd && new Date(newStart) >= new Date(newEnd)) {
        throw new ValidationError('startAt must be before endAt', 'schedule');
      }
      this._startAt = changes.startAt;
      this._endAt = changes.endAt;
      changedFields.push('schedule');
    }

    if (changedFields.length === 0) return;
    this.incrementVersion();
    void changedBy;
  }

  public addProduct(productId: ProductIdVO, changedBy: string): void {
    if (this._type === COLLECTION_TYPE.AUTOMATIC) {
      throw new BusinessRuleError(
        'Cannot manually add products to an automatic collection',
        'COLLECTION_AUTO_MANUAL_ADD',
      );
    }
    if (this._productIds.includes(productId.value)) return;
    if (this._productIds.length >= COLLECTION.MAX_PRODUCTS) {
      throw new BusinessRuleError(
        `Collection has reached product limit (${COLLECTION.MAX_PRODUCTS})`,
        'COLLECTION_LIMIT_EXCEEDED',
      );
    }
    this._productIds = Object.freeze([...this._productIds, productId.value]);
    this.incrementVersion();
    void changedBy;
  }

  public removeProduct(productId: ProductIdVO): void {
    if (!this._productIds.includes(productId.value)) return;
    this._productIds = Object.freeze(
      this._productIds.filter((id) => id !== productId.value),
    );
    this.incrementVersion();
  }

  public addProducts(productIds: readonly ProductIdVO[], changedBy: string): void {
    if (this._type === COLLECTION_TYPE.AUTOMATIC) {
      throw new BusinessRuleError(
        'Cannot manually add products to an automatic collection',
        'COLLECTION_AUTO_MANUAL_ADD',
      );
    }
    const merged = new Set(this._productIds);
    for (const id of productIds) merged.add(id.value);
    if (merged.size > COLLECTION.MAX_PRODUCTS) {
      throw new BusinessRuleError(
        `Adding products would exceed limit (${COLLECTION.MAX_PRODUCTS})`,
        'COLLECTION_LIMIT_EXCEEDED',
      );
    }
    this._productIds = Object.freeze([...merged]);
    this.incrementVersion();
    void changedBy;
  }

  public publish(): void {
    if (this._status === COLLECTION_STATUS.ACTIVE) return;
    this._status = COLLECTION_STATUS.ACTIVE;
    this.incrementVersion();
  }

  public unpublish(): void {
    if (this._status === COLLECTION_STATUS.INACTIVE) return;
    this._status = COLLECTION_STATUS.INACTIVE;
    this.incrementVersion();
  }

  public schedule(startAt: string, endAt: string): void {
    if (new Date(startAt) >= new Date(endAt)) {
      throw new ValidationError('startAt must be before endAt', 'schedule');
    }
    this._startAt = startAt;
    this._endAt = endAt;
    this._status = COLLECTION_STATUS.SCHEDULED;
    this.incrementVersion();
  }

  public softDelete(deletedBy: string): void {
    this._status = COLLECTION_STATUS.DELETED;
    this.incrementVersion();
    void deletedBy;
  }

  // Queries
  public isActive(now: string): boolean {
    if (this._status !== COLLECTION_STATUS.ACTIVE) return false;
    const t = new Date(now).getTime();
    if (this._startAt && t < new Date(this._startAt).getTime()) return false;
    if (this._endAt && t > new Date(this._endAt).getTime()) return false;
    return true;
  }

  public isAutomatic(): boolean {
    return this._type === COLLECTION_TYPE.AUTOMATIC;
  }

  public hasProduct(productId: ProductIdVO): boolean {
    return this._productIds.includes(productId.value);
  }

  public canAddMore(): boolean {
    return this._productIds.length < COLLECTION.MAX_PRODUCTS;
  }

  // Factories
  public static create(params: {
    id: string;
    props: CollectionEntityProps;
    now: string;
  }): CollectionEntity {
    const entity = new CollectionEntity(params.id, params.now, params.now, params.props);
    entity.incrementVersion();
    return entity;
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CollectionEntityProps;
  }): CollectionEntity {
    return new CollectionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
