/**
 * ProductEntity — Aggregate Root
 * @module product-service/domain/entities
 *
 * Business rules:
 * - Publish requires: non-empty description, price > 0, stock > 0 (physical)
 * - Status transitions controlled via ProductStatusVO.canTransitionTo
 * - Variant limit: 100 per product
 * - Media limit: 20 images per product
 * - Price can never be negative
 * - Only DRAFT/REJECTED can be edited freely
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PRODUCT_STATUS, PRODUCT_TYPE, VARIANT } from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { ProductNameVO } from '../value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../value-objects/primitives/product-sku.vo.js';
import { ProductStatusVO } from '../value-objects/primitives/product-status.vo.js';
import { ProductTypeVO } from '../value-objects/primitives/product-type.vo.js';
import { ProductDescriptionVO } from '../value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo.js';
import { PriceVO } from '../value-objects/primitives/price.vo.js';
import { ProductCompositeVO } from '../value-objects/composites/product.vo.js';
import {
  ProductAlreadyPublishedError,
  ProductCannotBePublishedError,
} from '../errors/product.errors.js';
import {
  ProductCreatedEvent,
  ProductUpdatedEvent,
  ProductPublishedEvent,
  ProductUnpublishedEvent,
  ProductArchivedEvent,
  ProductDeletedEvent,
  ProductStatusChangedEvent,
  ProductPriceChangedEvent,
  ProductFeaturedEvent,
  ProductUnfeaturedEvent,
} from '../events/product.events.js';

export interface ProductEntityProps {
  readonly name: ProductNameVO;
  readonly slug: ProductSlugVO;
  readonly sku: ProductSkuVO;
  readonly type: ProductTypeVO;
  readonly status: ProductStatusVO;
  readonly description: ProductDescriptionVO;
  readonly shortDescription?: string;
  readonly categoryId: CategoryIdVO;
  readonly brandId?: BrandIdVO;
  readonly vendorId?: string;
  readonly price: PriceVO;
  readonly compareAtPrice?: PriceVO;
  readonly tags: readonly string[];
  readonly images: readonly string[];
  readonly thumbnailUrl?: string;
  readonly videoUrl?: string;
  readonly totalStock: number;
  readonly variantIds: readonly string[];
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly publishedAt?: string;
  readonly weight?: number;
  readonly barcode?: string;
}

export class ProductEntity extends AggregateRoot<string> {
  private readonly _name: ProductNameVO;
  private readonly _slug: ProductSlugVO;
  private readonly _sku: ProductSkuVO;
  private readonly _type: ProductTypeVO;
  private _status: ProductStatusVO;
  private _description: ProductDescriptionVO;
  private _shortDescription?: string;
  private _categoryId: CategoryIdVO;
  private _brandId?: BrandIdVO;
  private readonly _vendorId?: string;
  private _price: PriceVO;
  private _compareAtPrice?: PriceVO;
  private _tags: readonly string[];
  private _images: readonly string[];
  private _thumbnailUrl?: string;
  private _videoUrl?: string;
  private _totalStock: number;
  private _variantIds: readonly string[];
  private _isFeatured: boolean;
  private _isPublished: boolean;
  private _publishedAt?: string;
  private _weight?: number;
  private _barcode?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._sku = props.sku;
    this._type = props.type;
    this._status = props.status;
    this._description = props.description;
    this._shortDescription = props.shortDescription;
    this._categoryId = props.categoryId;
    this._brandId = props.brandId;
    this._vendorId = props.vendorId;
    this._price = props.price;
    this._compareAtPrice = props.compareAtPrice;
    this._tags = props.tags;
    this._images = props.images;
    this._thumbnailUrl = props.thumbnailUrl;
    this._videoUrl = props.videoUrl;
    this._totalStock = props.totalStock;
    this._variantIds = props.variantIds;
    this._isFeatured = props.isFeatured;
    this._isPublished = props.isPublished;
    this._publishedAt = props.publishedAt;
    this._weight = props.weight;
    this._barcode = props.barcode;
  }

  // ─── Getters ──────────────────────────────────────────────

  get name(): ProductNameVO { return this._name; }
  get slug(): ProductSlugVO { return this._slug; }
  get sku(): ProductSkuVO { return this._sku; }
  get type(): ProductTypeVO { return this._type; }
  get status(): ProductStatusVO { return this._status; }
  get description(): ProductDescriptionVO { return this._description; }
  get shortDescription(): string | undefined { return this._shortDescription; }
  get categoryId(): CategoryIdVO { return this._categoryId; }
  get brandId(): BrandIdVO | undefined { return this._brandId; }
  get vendorId(): string | undefined { return this._vendorId; }
  get price(): PriceVO { return this._price; }
  get compareAtPrice(): PriceVO | undefined { return this._compareAtPrice; }
  get tags(): readonly string[] { return this._tags; }
  get images(): readonly string[] { return this._images; }
  get thumbnailUrl(): string | undefined { return this._thumbnailUrl; }
  get videoUrl(): string | undefined { return this._videoUrl; }
  get totalStock(): number { return this._totalStock; }
  get variantIds(): readonly string[] { return this._variantIds; }
  get isFeatured(): boolean { return this._isFeatured; }
  get isPublished(): boolean { return this._isPublished; }
  get publishedAt(): string | undefined { return this._publishedAt; }
  get weight(): number | undefined { return this._weight; }
  get barcode(): string | undefined { return this._barcode; }

  // ─── Invariants ───────────────────────────────────────────

  private assertNotDeleted(): void {
    if (this.isDeleted()) {
      throw new BusinessRuleError(
        `Product "${this.id}" is deleted and cannot be modified`,
        'PRODUCT_DELETED',
        { productId: this.id },
      );
    }
  }

  private assertEditable(): void {
    this.assertNotDeleted();
    const notEditable = [
      PRODUCT_STATUS.PUBLISHED,
      PRODUCT_STATUS.ARCHIVED,
      PRODUCT_STATUS.DISCONTINUED,
    ];
    if ((notEditable as readonly string[]).includes(this._status.value)) {
      throw new BusinessRuleError(
        `Product in status "${this._status.value}" cannot be edited directly`,
        'PRODUCT_NOT_EDITABLE',
        { productId: this.id, status: this._status.value },
      );
    }
  }

  // ─── Business methods ─────────────────────────────────────

  /**
   * Update basic details. Only allowed in DRAFT/PENDING/REJECTED states.
   */
  public updateDetails(
    changes: {
      name?: ProductNameVO;
      description?: ProductDescriptionVO;
      shortDescription?: string;
      tags?: readonly string[];
      images?: readonly string[];
      thumbnailUrl?: string;
      videoUrl?: string;
      weight?: number;
      barcode?: string;
    },
    changedBy: string,
    now: string,
  ): void {
    this.assertEditable();

    const changedFields: string[] = [];
    if (changes.name) { this._name; /* readonly; skip */ }
    if (changes.description) { this._description = changes.description; changedFields.push('description'); }
    if (changes.shortDescription !== undefined) { this._shortDescription = changes.shortDescription; changedFields.push('shortDescription'); }
    if (changes.tags) {
      if (changes.tags.length > 50) {
        throw new ValidationError('Product cannot have more than 50 tags', 'tags');
      }
      this._tags = Object.freeze([...changes.tags]);
      changedFields.push('tags');
    }
    if (changes.images) {
      if (changes.images.length > 20) {
        throw new ValidationError('Product cannot have more than 20 images', 'images');
      }
      this._images = Object.freeze([...changes.images]);
      changedFields.push('images');
    }
    if (changes.thumbnailUrl !== undefined) { this._thumbnailUrl = changes.thumbnailUrl; changedFields.push('thumbnailUrl'); }
    if (changes.videoUrl !== undefined) { this._videoUrl = changes.videoUrl; changedFields.push('videoUrl'); }
    if (changes.weight !== undefined) { this._weight = changes.weight; changedFields.push('weight'); }
    if (changes.barcode !== undefined) { this._barcode = changes.barcode; changedFields.push('barcode'); }

    if (changedFields.length === 0) return;

    this.addDomainEvent(new ProductUpdatedEvent({
      aggregateId: this.id,
      payload: { productId: this.id, changedFields },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
    void now;
  }

  /**
   * Change product price (emits ProductPriceChangedEvent).
   */
  public changePrice(newPrice: PriceVO, changedBy: string): void {
    this.assertNotDeleted();

    const oldPrice = this._price.amount;
    if (oldPrice === newPrice.amount) return;

    this._price = newPrice;
    this.addDomainEvent(new ProductPriceChangedEvent({
      aggregateId: this.id,
      payload: {
        productId: this.id,
        oldPrice,
        newPrice: newPrice.amount,
        currency: newPrice.currency,
        changedBy,
      },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Change product status. Enforces transition rules.
   */
  public changeStatus(newStatus: ProductStatusVO, changedBy: string): void {
    this.assertNotDeleted();

    if (this._status.value === newStatus.value) return;

    if (!this._status.canTransitionTo(newStatus.value)) {
      throw new BusinessRuleError(
        `Cannot transition product from "${this._status.value}" to "${newStatus.value}"`,
        'INVALID_STATUS_TRANSITION',
        { productId: this.id, from: this._status.value, to: newStatus.value },
      );
    }

    const oldStatus = this._status.value;
    this._status = newStatus;

    if (newStatus.isPublished()) {
      this._isPublished = true;
    } else {
      this._isPublished = false;
    }

    this.addDomainEvent(new ProductStatusChangedEvent({
      aggregateId: this.id,
      payload: {
        productId: this.id,
        fromStatus: oldStatus,
        toStatus: newStatus.value,
        changedBy,
      },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Publish the product. Business rules enforced here.
   */
  public publish(publishedBy: string, now: string): void {
    this.assertNotDeleted();

    if (this._status.isPublished()) {
      throw new ProductAlreadyPublishedError(this.id);
    }

    // Rule: description required
    if (this._description.isEmpty) {
      throw new ProductCannotBePublishedError(this.id, 'description is required');
    }

    // Rule: price must be > 0
    if (this._price.amount <= 0) {
      throw new ProductCannotBePublishedError(this.id, 'price must be greater than zero');
    }

    // Rule: physical products need stock
    if (this._type.requiresShipping() && this._totalStock <= 0) {
      throw new ProductCannotBePublishedError(
        this.id,
        'physical product requires positive stock',
      );
    }

    // Rule: at least one image
    if (this._images.length === 0 && !this._thumbnailUrl) {
      throw new ProductCannotBePublishedError(this.id, 'at least one image is required');
    }

    // Rule: must have valid transition
    if (!this._status.canTransitionTo(PRODUCT_STATUS.PUBLISHED)) {
      throw new ProductCannotBePublishedError(
        this.id,
        `cannot transition from "${this._status.value}"`,
      );
    }

    this._status = ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED);
    this._isPublished = true;
    this._publishedAt = now;

    this.addDomainEvent(new ProductPublishedEvent({
      aggregateId: this.id,
      payload: {
        productId: this.id,
        publishedAt: now,
        publishedBy,
      },
      version: this.version + 1,
      metadata: { userId: publishedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Unpublish a published product.
   */
  public unpublish(unpublishedBy: string, reason: string | undefined, now: string): void {
    this.assertNotDeleted();

    if (!this._isPublished) {
      throw new BusinessRuleError(
        `Product "${this.id}" is not published`,
        'PRODUCT_NOT_PUBLISHED',
        { productId: this.id },
      );
    }

    this._status = ProductStatusVO.create(PRODUCT_STATUS.DRAFT);
    this._isPublished = false;
    this._publishedAt = undefined;

    this.addDomainEvent(new ProductUnpublishedEvent({
      aggregateId: this.id,
      payload: {
        productId: this.id,
        unpublishedAt: now,
        reason,
      },
      version: this.version + 1,
      metadata: { userId: unpublishedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Archive the product.
   */
  public archive(archivedBy: string, now: string): void {
    this.assertNotDeleted();

    if (this._status.isArchived()) {
      throw new BusinessRuleError(
        `Product "${this.id}" is already archived`,
        'PRODUCT_ALREADY_ARCHIVED',
        { productId: this.id },
      );
    }

    this._status = ProductStatusVO.create(PRODUCT_STATUS.ARCHIVED);
    this._isPublished = false;

    this.addDomainEvent(new ProductArchivedEvent({
      aggregateId: this.id,
      payload: {
        productId: this.id,
        archivedAt: now,
        archivedBy,
      },
      version: this.version + 1,
      metadata: { userId: archivedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Soft delete.
   */
  public softDelete(deletedBy: string, now: string): void {
    if (this.isDeleted()) return;

    this._status = ProductStatusVO.create(PRODUCT_STATUS.DELETED);
    this._isPublished = false;
    // BaseEntity.deletedAt is readonly; use reflection to set it after construction
    (this as unknown as { deletedAt: string | null }).deletedAt = now;

    this.addDomainEvent(new ProductDeletedEvent({
      aggregateId: this.id,
      payload: {
        productId: this.id,
        deletedAt: now,
        deletedBy,
      },
      version: this.version + 1,
      metadata: { userId: deletedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Feature the product on homepage.
   */
  public feature(changedBy: string): void {
    this.assertNotDeleted();
    if (this._isFeatured) return;
    this._isFeatured = true;
    this.addDomainEvent(new ProductFeaturedEvent({
      aggregateId: this.id,
      payload: { productId: this.id, isFeatured: true, changedBy },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Remove from featured.
   */
  public unfeature(changedBy: string): void {
    this.assertNotDeleted();
    if (!this._isFeatured) return;
    this._isFeatured = false;
    this.addDomainEvent(new ProductUnfeaturedEvent({
      aggregateId: this.id,
      payload: { productId: this.id, isFeatured: false, changedBy },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  /**
   * Add a variant. Enforces limit.
   */
  public addVariant(variantId: string): void {
    this.assertNotDeleted();
    if (this._variantIds.includes(variantId)) return;
    if (this._variantIds.length >= VARIANT.MAX_VARIANTS_PER_PRODUCT) {
      throw new BusinessRuleError(
        `Product "${this.id}" reached variant limit (${VARIANT.MAX_VARIANTS_PER_PRODUCT})`,
        'VARIANT_LIMIT_REACHED',
        { productId: this.id, limit: VARIANT.MAX_VARIANTS_PER_PRODUCT },
      );
    }
    this._variantIds = Object.freeze([...this._variantIds, variantId]);
    this.incrementVersion();
  }

  /**
   * Remove a variant.
   */
  public removeVariant(variantId: string): void {
    this.assertNotDeleted();
    if (!this._variantIds.includes(variantId)) return;
    this._variantIds = Object.freeze(this._variantIds.filter((id) => id !== variantId));
    this.incrementVersion();
  }

  /**
   * Update total stock (aggregated from inventory).
   */
  public updateTotalStock(total: number): void {
    if (total < 0) {
      throw new ValidationError('Total stock cannot be negative', 'totalStock');
    }
    this._totalStock = total;
  }

  /**
   * Change category.
   */
  public changeCategory(categoryId: CategoryIdVO, changedBy: string): void {
    this.assertEditable();
    if (this._categoryId.value === categoryId.value) return;
    this._categoryId = categoryId;
    this.incrementVersion();
    void changedBy;
  }

  /**
   * Change brand.
   */
  public changeBrand(brandId: BrandIdVO | undefined, changedBy: string): void {
    this.assertEditable();
    if (this._brandId?.value === brandId?.value) return;
    this._brandId = brandId;
    this.incrementVersion();
    void changedBy;
  }

  // ─── Queries ──────────────────────────────────────────────

  public isAvailable(): boolean {
    return this._isPublished && this._totalStock > 0 && !this.isDeleted();
  }

  public hasDiscount(): boolean {
    return (
      this._compareAtPrice !== undefined &&
      this._compareAtPrice.amount > this._price.amount
    );
  }

  public getDiscountPercent(): number {
    if (!this.hasDiscount()) return 0;
    const compare = this._compareAtPrice!;
    const diff = compare.amount - this._price.amount;
    return Math.round((diff / compare.amount) * 100);
  }

  public variantCount(): number {
    return this._variantIds.length;
  }

  public toComposite(): ProductCompositeVO {
    return ProductCompositeVO.reconstitute({
      id: ProductIdVO.reconstitute(this.id),
      name: this._name,
      slug: this._slug,
      sku: this._sku,
      type: this._type,
      status: this._status,
      description: this._description,
      categoryId: this._categoryId,
      brandId: this._brandId,
      price: this._price,
      compareAtPrice: this._compareAtPrice,
      totalStock: this._totalStock,
      variantIds: this._variantIds.map((v) => VariantIdVO.reconstitute(v)),
      isFeatured: this._isFeatured,
      tags: this._tags,
    });
  }

  // ─── Factories ────────────────────────────────────────────

  public static create(params: {
    id: string;
    props: ProductEntityProps;
    now: string;
  }): ProductEntity {
    const entity = new ProductEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );

    entity.addDomainEvent(new ProductCreatedEvent({
      aggregateId: params.id,
      payload: {
        productId: params.id,
        name: params.props.name.value,
        slug: params.props.slug.value,
        sku: params.props.sku.value,
        type: params.props.type.value,
        categoryId: params.props.categoryId.value,
        brandId: params.props.brandId?.value,
        vendorId: params.props.vendorId,
        price: params.props.price.amount,
        currency: params.props.price.currency,
      },
      version: 1,
    }));
    entity.incrementVersion();

    return entity;
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductEntityProps;
  }): ProductEntity {
    return new ProductEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
