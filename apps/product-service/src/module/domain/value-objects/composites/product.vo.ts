/**
 * Product Composite Value Object
 * @module product-service/domain/value-objects/composites
 *
 * Product aggregate এর সব scalar field একসাথে immutable value হিসেবে।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

import { ProductIdVO } from '../primitives/product-id.vo.js';
import { ProductNameVO } from '../primitives/product-name.vo.js';
import { ProductDescriptionVO } from '../primitives/product-description.vo.js';
import { ProductSlugVO } from '../primitives/product-slug.vo.js';
import { ProductSkuVO } from '../primitives/product-sku.vo.js';
import { ProductBarcodeVO } from '../primitives/product-barcode.vo.js';
import { ProductStatusVO } from '../primitives/product-status.vo.js';
import { ProductTypeVO } from '../primitives/product-type.vo.js';
import { ProductWeightVO } from '../primitives/product-weight.vo.js';
import { ProductDimensionVO } from '../primitives/product-dimension.vo.js';
import { CategoryIdVO } from '../primitives/category-id.vo.js';
import { BrandIdVO } from '../primitives/brand-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';

export interface ProductVOProps {
  readonly id: ProductIdVO;
  readonly name: ProductNameVO;
  readonly slug: ProductSlugVO;
  readonly sku: ProductSkuVO;
  readonly description?: ProductDescriptionVO;
  readonly shortDescription?: ProductDescriptionVO;
  readonly type: ProductTypeVO;
  readonly status: ProductStatusVO;
  readonly categoryId: CategoryIdVO;
  readonly brandId?: BrandIdVO;
  readonly vendorId?: VendorIdVO;
  readonly tags: readonly string[];
  readonly images: readonly string[];
  readonly thumbnailUrl?: string;
  readonly videoUrl?: string;
  readonly barcode?: ProductBarcodeVO;
  readonly weight?: ProductWeightVO;
  readonly dimensions?: ProductDimensionVO;
  readonly totalStock: number;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly publishedAt?: string;
}

export class ProductVO extends BaseVO<ProductVOProps> {
  private constructor(props: ProductVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductVOProps): ProductVO {
    const vo = new ProductVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductVOProps): ProductVO {
    return new ProductVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!Number.isInteger(v.totalStock) || v.totalStock < 0) {
      throw new ValidationError('Product totalStock must be a non-negative integer', 'totalStock');
    }

    if (v.tags && v.tags.length > 50) {
      throw new ValidationError('Product tags cannot exceed 50', 'tags');
    }
    for (const tag of v.tags) {
      if (typeof tag !== 'string' || tag.trim().length === 0) {
        throw new ValidationError('Product tags cannot contain empty', 'tags');
      }
    }

    if (v.images && v.images.length > 20) {
      throw new ValidationError('Product images cannot exceed 20', 'images');
    }
    for (const img of v.images) {
      if (!REGEX.URL.test(img)) {
        throw new ValidationError(`Invalid product image URL: ${img}`, 'images');
      }
    }

    if (v.thumbnailUrl && !REGEX.URL.test(v.thumbnailUrl)) {
      throw new ValidationError('Invalid thumbnail URL', 'thumbnailUrl');
    }
    if (v.videoUrl && !REGEX.URL.test(v.videoUrl)) {
      throw new ValidationError('Invalid video URL', 'videoUrl');
    }

    if (v.isPublished && !v.publishedAt) {
      throw new ValidationError('Published product must have publishedAt', 'publishedAt');
    }
    if (v.isPublished && v.status.isDraft()) {
      throw new ValidationError('Draft product cannot be marked published', 'isPublished');
    }
  }

  // ─── Getters ─────────────────────────────
  get id(): ProductIdVO { return this.value.id; }
  get name(): ProductNameVO { return this.value.name; }
  get slug(): ProductSlugVO { return this.value.slug; }
  get sku(): ProductSkuVO { return this.value.sku; }
  get description(): ProductDescriptionVO | undefined { return this.value.description; }
  get shortDescription(): ProductDescriptionVO | undefined { return this.value.shortDescription; }
  get type(): ProductTypeVO { return this.value.type; }
  get status(): ProductStatusVO { return this.value.status; }
  get categoryId(): CategoryIdVO { return this.value.categoryId; }
  get brandId(): BrandIdVO | undefined { return this.value.brandId; }
  get vendorId(): VendorIdVO | undefined { return this.value.vendorId; }
  get tags(): readonly string[] { return this.value.tags; }
  get images(): readonly string[] { return this.value.images; }
  get thumbnailUrl(): string | undefined { return this.value.thumbnailUrl; }
  get videoUrl(): string | undefined { return this.value.videoUrl; }
  get barcode(): ProductBarcodeVO | undefined { return this.value.barcode; }
  get weight(): ProductWeightVO | undefined { return this.value.weight; }
  get dimensions(): ProductDimensionVO | undefined { return this.value.dimensions; }
  get totalStock(): number { return this.value.totalStock; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get isPublished(): boolean { return this.value.isPublished; }
  get publishedAt(): string | undefined { return this.value.publishedAt; }

  // ─── Predicates ──────────────────────────
  isVisible(): boolean { return this.status.isVisible(); }
  isEditable(): boolean { return this.status.isEditable(); }
  isFinal(): boolean { return this.status.isFinal(); }

  hasBrand(): boolean { return this.brandId !== undefined; }
  hasVendor(): boolean { return this.vendorId !== undefined; }
  hasBarcode(): boolean { return this.barcode !== undefined; }
  hasWeight(): boolean { return this.weight !== undefined; }
  hasDimensions(): boolean { return this.dimensions !== undefined; }
  hasImages(): boolean { return this.images.length > 0; }
  hasTags(): boolean { return this.tags.length > 0; }

  inStock(): boolean { return this.totalStock > 0; }
  isOutOfStock(): boolean { return this.totalStock === 0; }

  isDigitalOnly(): boolean { return this.type.isDigitalOnly(); }
  requiresShipping(): boolean { return this.type.requiresShipping(); }

  // ─── Business helpers ────────────────────
  hasTag(tag: string): boolean {
    const normalized = tag.trim().toLowerCase();
    return this.tags.some((t) => t.toLowerCase() === normalized);
  }

  withTag(tag: string): ProductVO {
    if (this.hasTag(tag)) return this;
    return ProductVO.create({ ...this.value, tags: [...this.tags, tag] });
  }

  withoutTag(tag: string): ProductVO {
    const normalized = tag.trim().toLowerCase();
    return ProductVO.create({
      ...this.value,
      tags: this.tags.filter((t) => t.toLowerCase() !== normalized),
    });
  }
}
