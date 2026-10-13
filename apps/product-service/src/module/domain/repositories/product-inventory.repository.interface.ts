/**
 * Product Inventory Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductInventoryEntity } from '../entities/product-inventory.entity.js';
import type { InventoryIdVO } from '../value-objects/primitives/inventory-id.vo.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import type { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryListFilter {
  readonly productId?: string;
  readonly variantId?: string;
  readonly status?: string | readonly string[];
  readonly belowThreshold?: number;
}

export interface InventoryListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'quantity' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InventoryListFilter;
}

export interface InventoryPaginationResult {
  readonly items: readonly ProductInventoryEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface InventoryStats {
  readonly totalRecords: number;
  readonly inStockCount: number;
  readonly lowStockCount: number;
  readonly outOfStockCount: number;
  readonly totalQuantity: number;
  readonly totalReserved: number;
  readonly totalAvailable: number;
}

export interface ProductInventoryRepository extends BaseRepository<ProductInventoryEntity, string> {
  findByIdVO(id: InventoryIdVO): Promise<ProductInventoryEntity | null>;

  findByProduct(productId: ProductIdVO): Promise<ProductInventoryEntity | null>;
  findByVariant(variantId: VariantIdVO): Promise<ProductInventoryEntity | null>;
  findBySku(sku: string): Promise<ProductInventoryEntity | null>;

  findPaginated(options: InventoryListOptions): Promise<InventoryPaginationResult>;

  getStats(filter?: InventoryListFilter): Promise<InventoryStats>;

  // Cron — low stock alerts
  findBelowThreshold(threshold: number): Promise<readonly ProductInventoryEntity[]>;
  findOutOfStock(): Promise<readonly ProductInventoryEntity[]>;
  findCritical(threshold: number): Promise<readonly ProductInventoryEntity[]>;

  // Bulk adjust
  adjustBatch(adjustments: readonly { id: string; delta: number }[]): Promise<void>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
