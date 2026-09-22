import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductInventoryEntity } from '../entities/product-inventory.entity';
import { InventoryIdVO } from '../value-objects/primitives/inventory-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductInventoryRepository
  extends BaseRepository<ProductInventoryEntity, InventoryIdVO> {
  findByProduct(productId: ProductIdVO): Promise<ProductInventoryEntity | null>;
  findLowStock(threshold: number): Promise<readonly ProductInventoryEntity[]>;
  findOutOfStock(): Promise<readonly ProductInventoryEntity[]>;
  deleteByProduct(productId: ProductIdVO): Promise<void>;
}
