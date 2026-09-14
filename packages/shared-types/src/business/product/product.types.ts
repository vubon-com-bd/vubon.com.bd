/**
 * Product Core Types
 * @module shared-types/business/product
 *
 * Base entity + aggregator।
 */

import type {
  ProductId,
  VendorId,
  CategoryId,
  BrandId,
  Money,
  Slug,
  Url,
} from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { ProductStatusValue } from './product-status.types';
import type { ProductTypeValue } from './product-type.types';
import type { Variant } from './variant.types';
import type { ProductAttribute } from './attribute.types';
import type { Inventory } from './inventory.types';
import type { Pricing } from './pricing.types';
import type { ReviewSummary } from './review.types';

export interface Product extends BaseEntity<ProductId> {
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly shortDescription?: string;
  readonly type: ProductTypeValue;
  readonly status: ProductStatusValue;
  readonly vendorId?: VendorId;
  readonly categoryId: CategoryId;
  readonly brandId?: BrandId;
  readonly tags: readonly string[];
  readonly images: readonly Url[];
  readonly thumbnailUrl?: Url;
  readonly videoUrl?: Url;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly currency: string;
  readonly variants?: readonly Variant[];
  readonly attributes?: readonly ProductAttribute[];
  readonly inventory?: Inventory;
  readonly pricing?: Pricing;
  readonly reviewSummary?: ReviewSummary;
  readonly totalStock: number;
  readonly sku: string;
  readonly barcode?: string;
  readonly weight?: number;
  readonly dimensions?: ProductDimensions;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly publishedAt?: string;
}

export interface ProductDimensions {
  readonly length: number;
  readonly width: number;
  readonly height: number;
  readonly unit: 'cm' | 'in';
}

export interface ProductPublic {
  readonly id: ProductId;
  readonly name: string;
  readonly slug: Slug;
  readonly shortDescription?: string;
  readonly type: ProductTypeValue;
  readonly status: ProductStatusValue;
  readonly categoryId: CategoryId;
  readonly brandId?: BrandId;
  readonly tags: readonly string[];
  readonly images: readonly Url[];
  readonly thumbnailUrl?: Url;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly currency: string;
  readonly totalStock: number;
  readonly reviewSummary?: ReviewSummary;
  readonly isFeatured: boolean;
}

export interface ProductSummary {
  readonly id: ProductId;
  readonly name: string;
  readonly slug: Slug;
  readonly thumbnailUrl?: Url;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly totalStock: number;
  readonly averageRating?: number;
  readonly reviewCount?: number;
}

export interface ProductCreateInput {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly shortDescription?: string;
  readonly type: ProductTypeValue;
  readonly categoryId: CategoryId;
  readonly brandId?: BrandId;
  readonly vendorId?: VendorId;
  readonly tags?: readonly string[];
  readonly images?: readonly string[];
  readonly price: number;
  readonly compareAtPrice?: number;
  readonly currency: string;
  readonly sku: string;
  readonly barcode?: string;
  readonly weight?: number;
  readonly dimensions?: ProductDimensions;
}

export interface ProductUpdateInput {
  readonly name?: string;
  readonly description?: string;
  readonly shortDescription?: string;
  readonly status?: ProductStatusValue;
  readonly categoryId?: CategoryId;
  readonly brandId?: BrandId;
  readonly tags?: readonly string[];
  readonly images?: readonly string[];
  readonly price?: number;
  readonly compareAtPrice?: number;
  readonly isFeatured?: boolean;
}

export interface ProductListFilter {
  readonly status?: ProductStatusValue;
  readonly type?: ProductTypeValue;
  readonly categoryId?: CategoryId;
  readonly brandId?: BrandId;
  readonly vendorId?: VendorId;
  readonly isFeatured?: boolean;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly inStock?: boolean;
  readonly search?: string;
  readonly tags?: readonly string[];
}
