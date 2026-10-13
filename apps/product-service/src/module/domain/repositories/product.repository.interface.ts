/**
 * Product Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductEntity } from '../entities/product.entity.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import type { CategoryIdVO } from '../value-objects/primitives/category-id.vo.js';
import type { BrandIdVO } from '../value-objects/primitives/brand-id.vo.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

// ─── DI Token ──────────────────────────────
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface ProductListFilter {
  readonly status?: string | readonly string[];
  readonly type?: string | readonly string[];
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly isFeatured?: boolean;
  readonly isPublished?: boolean;
  readonly inStock?: boolean;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly search?: string;
  readonly tags?: readonly string[];
  readonly createdFrom?: string;
  readonly createdTo?: string;
}

// ─── List Options ──────────────────────────
export interface ProductListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'price' | 'totalStock';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ProductListFilter;
  readonly includeDeleted?: boolean;
}

// ─── Pagination Result ─────────────────────
export interface ProductPaginationResult {
  readonly items: readonly ProductEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ─── Stats ─────────────────────────────────
export interface ProductStats {
  readonly total: number;
  readonly publishedCount: number;
  readonly draftCount: number;
  readonly outOfStockCount: number;
  readonly totalStockUnits: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

// ─── Main Interface ────────────────────────
export interface ProductRepository extends BaseRepository<ProductEntity, string> {
  // Find by VO
  findByIdVO(id: ProductIdVO): Promise<ProductEntity | null>;

  // Uniqueness checks (before save)
  existsBySlug(slug: string): Promise<boolean>;
  existsBySku(sku: string): Promise<boolean>;
  findBySlug(slug: string): Promise<ProductEntity | null>;
  findBySku(sku: string): Promise<ProductEntity | null>;

  // Lookups
  findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]>;
  findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]>;
  findByVendor(vendorId: VendorIdVO): Promise<readonly ProductEntity[]>;
  findByStatus(status: string): Promise<readonly ProductEntity[]>;
  findFeatured(limit?: number): Promise<readonly ProductEntity[]>;
  findPublished(limit?: number): Promise<readonly ProductEntity[]>;

  // Pagination + filter
  findPaginated(options: ProductListOptions): Promise<ProductPaginationResult>;

  // Search
  search(term: string, limit?: number): Promise<readonly ProductEntity[]>;

  // Stats
  getStats(filter?: ProductListFilter): Promise<ProductStats>;

  // Count helpers
  countByCategory(categoryId: CategoryIdVO): Promise<number>;
  countByBrand(brandId: BrandIdVO): Promise<number>;
  countByVendor(vendorId: VendorIdVO): Promise<number>;

  // Cron / background support
  findStaleDrafts(olderThanHours: number): Promise<readonly ProductEntity[]>;
  findLowStock(threshold: number): Promise<readonly ProductEntity[]>;
  findOutOfStock(limit?: number): Promise<readonly ProductEntity[]>;

  // Bulk
  saveMany(entities: readonly ProductEntity[]): Promise<readonly ProductEntity[]>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
