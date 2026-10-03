/**
 * Test fixtures — typed builders for entities
 * @module product-service/test
 */
import { ProductEntity, type ProductEntityProps } from '../src/module/domain/entities/product.entity.js';
import { ProductVariantEntity, type ProductVariantEntityProps } from '../src/module/domain/entities/product-variant.entity.js';
import { ProductInventoryEntity, type ProductInventoryEntityProps } from '../src/module/domain/entities/product-inventory.entity.js';
import { ProductPricingEntity, type ProductPricingEntityProps } from '../src/module/domain/entities/product-pricing.entity.js';
import { ProductReviewEntity, type ProductReviewEntityProps } from '../src/module/domain/entities/product-review.entity.js';

import { ProductNameVO } from '../src/module/domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../src/module/domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../src/module/domain/value-objects/primitives/product-sku.vo.js';
import { ProductTypeVO } from '../src/module/domain/value-objects/primitives/product-type.vo.js';
import { ProductStatusVO } from '../src/module/domain/value-objects/primitives/product-status.vo.js';
import { ProductDescriptionVO } from '../src/module/domain/value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../src/module/domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../src/module/domain/value-objects/primitives/brand-id.vo.js';
import { PriceVO } from '../src/module/domain/value-objects/primitives/price.vo.js';
import { ProductIdVO } from '../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../src/module/domain/value-objects/primitives/variant-id.vo.js';
import { VariantNameVO } from '../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../src/module/domain/value-objects/primitives/variant-sku.vo.js';
import { InventoryQuantityVO } from '../src/module/domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../src/module/domain/value-objects/primitives/inventory-threshold.vo.js';
import { DiscountPercentVO } from '../src/module/domain/value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../src/module/domain/value-objects/primitives/tax-rate.vo.js';
import { ReviewRatingVO } from '../src/module/domain/value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../src/module/domain/value-objects/primitives/review-comment.vo.js';

import { PRODUCT_TYPE, PRODUCT_STATUS, PRICING_TYPE, VARIANT_STATUS } from '@vubon/shared-constants/business/product';

import {
  NOW, USER_ID, PRODUCT_ID, VARIANT_ID, CATEGORY_ID, BRAND_ID, REVIEW_ID, INVENTORY_ID, COLLECTION_ID, DEFAULT_CURRENCY,
} from './helpers.js';

// ─── Product ─────────────────────────────────────────────

export function buildProductProps(
  overrides: Partial<ProductEntityProps> = {},
): ProductEntityProps {
  const defaults: ProductEntityProps = {
    name: ProductNameVO.create('Test Product'),
    slug: ProductSlugVO.create('test-product'),
    sku: ProductSkuVO.create('TEST-001'),
    type: ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL),
    status: ProductStatusVO.create(PRODUCT_STATUS.DRAFT),
    description: ProductDescriptionVO.create('A test product description'),
    categoryId: CategoryIdVO.create(CATEGORY_ID),
    brandId: BrandIdVO.create(BRAND_ID),
    price: PriceVO.create(1000, DEFAULT_CURRENCY),
    tags: [],
    images: ['https://cdn.example.com/img.jpg'],
    totalStock: 10,
    variantIds: [],
    isFeatured: false,
    isPublished: false,
  };
  return { ...defaults, ...overrides };
}

export function buildProduct(overrides: Partial<ProductEntityProps> = {}): ProductEntity {
  return ProductEntity.reconstitute({
    id: PRODUCT_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildProductProps(overrides),
  });
}

export function buildNewProduct(
  overrides: Partial<ProductEntityProps> = {},
): ProductEntity {
  return ProductEntity.create({
    id: PRODUCT_ID,
    now: NOW,
    props: buildProductProps(overrides),
  });
}

// ─── Variant ─────────────────────────────────────────────

export function buildVariantProps(
  overrides: Partial<ProductVariantEntityProps> = {},
): ProductVariantEntityProps {
  const defaults: ProductVariantEntityProps = {
    productId: ProductIdVO.create(PRODUCT_ID),
    name: VariantNameVO.create('Red / Large'),
    sku: VariantSkuVO.create('TEST-RED-L'),
    type: 'color',
    options: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'L' }],
    price: PriceVO.create(1200, DEFAULT_CURRENCY),
    status: VARIANT_STATUS.ACTIVE,
    stock: 10,
  };
  return { ...defaults, ...overrides };
}

export function buildVariant(
  overrides: Partial<ProductVariantEntityProps> = {},
): ProductVariantEntity {
  return ProductVariantEntity.reconstitute({
    id: VARIANT_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildVariantProps(overrides),
  });
}

// ─── Inventory ───────────────────────────────────────────

export function buildInventoryProps(
  overrides: Partial<ProductInventoryEntityProps> = {},
): ProductInventoryEntityProps {
  const defaults: ProductInventoryEntityProps = {
    productId: ProductIdVO.create(PRODUCT_ID),
    sku: 'TEST-001',
    quantity: InventoryQuantityVO.create(100),
    reserved: InventoryQuantityVO.zero(),
    lowStockThreshold: InventoryThresholdVO.default(),
    trackQuantity: true,
    allowBackorder: false,
  };
  return { ...defaults, ...overrides };
}

export function buildInventory(
  overrides: Partial<ProductInventoryEntityProps> = {},
): ProductInventoryEntity {
  return ProductInventoryEntity.reconstitute({
    id: INVENTORY_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildInventoryProps(overrides),
  });
}

// ─── Pricing ─────────────────────────────────────────────

export function buildPricingProps(
  overrides: Partial<ProductPricingEntityProps> = {},
): ProductPricingEntityProps {
  const defaults: ProductPricingEntityProps = {
    productId: ProductIdVO.create(PRODUCT_ID),
    type: PRICING_TYPE.FIXED,
    basePrice: PriceVO.create(1200, DEFAULT_CURRENCY),
    sellingPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
    taxRate: TaxRateVO.zero(),
    taxInclusive: true,
    discountPercent: DiscountPercentVO.none(),
  };
  return { ...defaults, ...overrides };
}

export function buildPricing(
  overrides: Partial<ProductPricingEntityProps> = {},
): ProductPricingEntity {
  return ProductPricingEntity.reconstitute({
    id: 'pricing-11111111-1111-1111-1111-111111111111',
    createdAt: NOW,
    updatedAt: NOW,
    props: buildPricingProps(overrides),
  });
}

// ─── Review ──────────────────────────────────────────────

export function buildReviewProps(
  overrides: Partial<ProductReviewEntityProps> = {},
): ProductReviewEntityProps {
  const defaults: ProductReviewEntityProps = {
    productId: ProductIdVO.create(PRODUCT_ID),
    userId: USER_ID,
    rating: ReviewRatingVO.create(5),
    comment: ReviewCommentVO.create('Excellent product with great quality'),
    images: [],
    status: 'pending',
    isVerifiedPurchase: true,
    helpfulCount: 0,
    reportCount: 0,
    createdAt: NOW,
    updatedAt: NOW,
  };
  return { ...defaults, ...overrides };
}

export function buildReview(
  overrides: Partial<ProductReviewEntityProps> = {},
): ProductReviewEntity {
  return ProductReviewEntity.reconstitute({
    id: REVIEW_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildReviewProps(overrides),
  });
}

// ═══════════════════════════════════════════════════════
// Batch 2 Fixtures — Brand, Category, Collection, Attribute, Media
// ═══════════════════════════════════════════════════════

import { BrandEntity, type BrandEntityProps } from '../src/module/domain/entities/brand.entity.js';
import { CategoryEntity, type CategoryEntityProps } from '../src/module/domain/entities/category.entity.js';
import { CollectionEntity, type CollectionEntityProps } from '../src/module/domain/entities/collection.entity.js';
import { ProductAttributeEntity, type ProductAttributeEntityProps } from '../src/module/domain/entities/product-attribute.entity.js';
import { ProductMediaEntity, type ProductMediaEntityProps } from '../src/module/domain/entities/product-media.entity.js';
import { BrandNameVO } from '../src/module/domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../src/module/domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../src/module/domain/value-objects/primitives/brand-logo.vo.js';
import { CategoryNameVO } from '../src/module/domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../src/module/domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../src/module/domain/value-objects/primitives/category-path.vo.js';
import { CollectionNameVO } from '../src/module/domain/value-objects/primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../src/module/domain/value-objects/primitives/collection-slug.vo.js';
import { AttributeIdVO } from '../src/module/domain/value-objects/primitives/attribute-id.vo.js';
import { ATTRIBUTE_TYPE, COLLECTION_TYPE } from '@vubon/shared-constants/business/product';

export function buildBrandProps(overrides: Partial<BrandEntityProps> = {}): BrandEntityProps {
  const defaults: BrandEntityProps = {
    name: BrandNameVO.create('Sony'),
    slug: BrandSlugVO.create('sony'),
    description: 'Sony Corporation',
    logo: BrandLogoVO.create('https://cdn.example.com/sony.png'),
    website: 'https://sony.com',
    status: 'active',
    isFeatured: false,
    productCount: 0,
    country: 'JP',
  };
  return { ...defaults, ...overrides };
}

export function buildBrand(overrides: Partial<BrandEntityProps> = {}): BrandEntity {
  return BrandEntity.reconstitute({
    id: BRAND_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildBrandProps(overrides),
  });
}

export function buildNewBrand(overrides: Partial<BrandEntityProps> = {}): BrandEntity {
  return BrandEntity.create({
    id: BRAND_ID,
    now: NOW,
    props: buildBrandProps(overrides),
  });
}

export function buildCategoryProps(overrides: Partial<CategoryEntityProps> = {}): CategoryEntityProps {
  const defaults: CategoryEntityProps = {
    name: CategoryNameVO.create('Electronics'),
    slug: CategorySlugVO.create('electronics'),
    path: CategoryPathVO.create([CATEGORY_ID]),
    status: 'active',
    sortOrder: 0,
    productCount: 0,
    isFeatured: false,
    hasChildren: false,
  };
  return { ...defaults, ...overrides };
}

export function buildCategory(overrides: Partial<CategoryEntityProps> = {}): CategoryEntity {
  return CategoryEntity.reconstitute({
    id: CATEGORY_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildCategoryProps(overrides),
  });
}

export function buildNewCategory(overrides: Partial<CategoryEntityProps> = {}): CategoryEntity {
  return CategoryEntity.create({
    id: CATEGORY_ID,
    now: NOW,
    props: buildCategoryProps(overrides),
  });
}

export function buildCollectionProps(overrides: Partial<CollectionEntityProps> = {}): CollectionEntityProps {
  const defaults: CollectionEntityProps = {
    name: CollectionNameVO.create('Summer Sale'),
    slug: CollectionSlugVO.create('summer-sale'),
    description: 'Summer collection',
    type: COLLECTION_TYPE.MANUAL,
    status: 'inactive',
    productIds: [],
    isFeatured: false,
    sortOrder: 0,
  };
  return { ...defaults, ...overrides };
}

export function buildCollection(overrides: Partial<CollectionEntityProps> = {}): CollectionEntity {
  return CollectionEntity.reconstitute({
    id: COLLECTION_ID,
    createdAt: NOW,
    updatedAt: NOW,
    props: buildCollectionProps(overrides),
  });
}

export function buildNewCollection(overrides: Partial<CollectionEntityProps> = {}): CollectionEntity {
  return CollectionEntity.create({
    id: COLLECTION_ID,
    now: NOW,
    props: buildCollectionProps(overrides),
  });
}

export function buildAttributeProps(overrides: Partial<ProductAttributeEntityProps> = {}): ProductAttributeEntityProps {
  const defaults: ProductAttributeEntityProps = {
    productId: PRODUCT_ID,
    name: 'Color',
    slug: 'color',
    type: ATTRIBUTE_TYPE.SELECT,
    isRequired: false,
    isSearchable: true,
    isFilterable: true,
    options: [
      { value: 'red', label: 'Red', sortOrder: 1 },
      { value: 'blue', label: 'Blue', sortOrder: 2 },
    ],
  };
  return { ...defaults, ...overrides };
}

export function buildAttribute(overrides: Partial<ProductAttributeEntityProps> = {}): ProductAttributeEntity {
  return ProductAttributeEntity.reconstitute({
    id: 'attr-11111111-1111-1111-1111-111111111111',
    createdAt: NOW,
    updatedAt: NOW,
    props: buildAttributeProps(overrides),
  });
}

export function buildMediaProps(overrides: Partial<ProductMediaEntityProps> = {}): ProductMediaEntityProps {
  const defaults: ProductMediaEntityProps = {
    productId: PRODUCT_ID,
    type: 'image',
    url: 'https://cdn.example.com/img.jpg',
    thumbnailUrl: 'https://cdn.example.com/img-thumb.jpg',
    alt: 'Product image',
    sortOrder: 0,
    sizeBytes: 1024 * 1024, // 1MB
    mimeType: 'image/jpeg',
    width: 800,
    height: 600,
    isPrimary: false,
  };
  return { ...defaults, ...overrides };
}

export function buildMedia(overrides: Partial<ProductMediaEntityProps> = {}): ProductMediaEntity {
  return ProductMediaEntity.reconstitute({
    id: 'media-11111111-1111-1111-1111-111111111111',
    createdAt: NOW,
    updatedAt: NOW,
    props: buildMediaProps(overrides),
  });
}

// silence unused imports
void AttributeIdVO;
