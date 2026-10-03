/**
 * Inventory Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductInventoryEntity } from '../entities/product-inventory.entity.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { InventoryIdVO } from '../value-objects/primitives/inventory-id.vo.js';

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryRepository extends BaseRepository<ProductInventoryEntity, string> {
  findByIdVO(id: InventoryIdVO): Promise<ProductInventoryEntity | null>;
  findByProductId(productId: ProductIdVO): Promise<readonly ProductInventoryEntity[]>;
  findByVariantId(variantId: VariantIdVO): Promise<ProductInventoryEntity | null>;
  findBySku(sku: string): Promise<ProductInventoryEntity | null>;
  findLowStock(): Promise<readonly ProductInventoryEntity[]>;
  findOutOfStock(): Promise<readonly ProductInventoryEntity[]>;
  findByIds(ids: readonly string[]): Promise<readonly ProductInventoryEntity[]>;
  countByProductId(productId: ProductIdVO): Promise<number>;
  deleteByProductId(productId: ProductIdVO): Promise<number>;
  sumAvailableByProductId(productId: ProductIdVO): Promise<number>;
}
