/**
 * Product Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductEntity } from '../entities/product.entity.js';
import { ProductSlugVO } from '../value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../value-objects/primitives/product-sku.vo.js';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly isFeatured?: boolean;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly inStock?: boolean;
  readonly search?: string;
  readonly tags?: readonly string[];
}

export interface ProductListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'price' | 'name' | 'totalStock';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ProductListFilter;
}

export interface ProductPaginationResult {
  readonly items: readonly ProductEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ProductRepository extends BaseRepository<ProductEntity, string> {
  findBySlug(slug: ProductSlugVO): Promise<ProductEntity | null>;
  findBySku(sku: ProductSkuVO): Promise<ProductEntity | null>;
  existsBySlug(slug: ProductSlugVO): Promise<boolean>;
  existsBySku(sku: ProductSkuVO): Promise<boolean>;
  findByIdVO(id: ProductIdVO): Promise<ProductEntity | null>;
  findByIds(ids: readonly string[]): Promise<readonly ProductEntity[]>;
  findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]>;
  findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]>;
  findFeatured(limit?: number): Promise<readonly ProductEntity[]>;
  findPublished(): Promise<readonly ProductEntity[]>;
  findPaginated(options: ProductListOptions): Promise<ProductPaginationResult>;
  countByCategory(categoryId: CategoryIdVO): Promise<number>;
  countByBrand(brandId: BrandIdVO): Promise<number>;
  incrementCategoryCount(categoryId: CategoryIdVO): Promise<void>;
  decrementCategoryCount(categoryId: CategoryIdVO): Promise<void>;
}
