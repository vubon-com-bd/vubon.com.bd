/**
 * Product Variant Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductVariantEntity } from '../entities/product-variant.entity.js';
import type { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const VARIANT_REPOSITORY = Symbol('VARIANT_REPOSITORY');

export interface VariantListFilter {
  readonly productId?: string;
  readonly isActive?: boolean;
  readonly inStock?: boolean;
  readonly sku?: string;
}

export interface VariantListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'sku';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VariantListFilter;
}

export interface VariantPaginationResult {
  readonly items: readonly ProductVariantEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VariantStats {
  readonly total: number;
  readonly activeCount: number;
  readonly outOfStockCount: number;
  readonly totalStockUnits: number;
}

export interface ProductVariantRepository extends BaseRepository<ProductVariantEntity, string> {
  findByIdVO(id: VariantIdVO): Promise<ProductVariantEntity | null>;

  existsBySku(sku: string): Promise<boolean>;
  findBySku(sku: string): Promise<ProductVariantEntity | null>;

  findByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]>;
  findActiveByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]>;

  findPaginated(options: VariantListOptions): Promise<VariantPaginationResult>;

  getStats(productId?: string): Promise<VariantStats>;

  countByProduct(productId: ProductIdVO): Promise<number>;

  // Bulk
  saveMany(entities: readonly ProductVariantEntity[]): Promise<readonly ProductVariantEntity[]>;
  deleteByProduct(productId: ProductIdVO): Promise<number>;

  // Cron
  findLowStock(threshold: number): Promise<readonly ProductVariantEntity[]>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
