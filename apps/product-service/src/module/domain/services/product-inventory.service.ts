import { ProductInventoryEntity } from '../entities/product-inventory.entity';
import { InventoryQuantityVO } from '../value-objects/primitives/inventory-quantity.vo';

export class ProductInventoryService {
  static hasAvailable(inventory: ProductInventoryEntity, needed: number): boolean {
    return inventory.available >= needed;
  }

  static lowStockThreshold(): number {
    return 5;
  }

  static calculateRestockNeeded(
    inventory: ProductInventoryEntity,
    target: number,
  ): InventoryQuantityVO {
    const diff = Math.max(0, target - inventory.quantity.value);
    return InventoryQuantityVO.create(diff);
  }
}
