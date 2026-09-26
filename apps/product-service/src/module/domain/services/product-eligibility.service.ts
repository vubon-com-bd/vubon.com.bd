import { ProductEntity } from '../entities/product.entity';
import { ProductInventoryEntity } from '../entities/product-inventory.entity';

export class ProductEligibilityService {
  static canPublish(
    product: ProductEntity,
    inventory: ProductInventoryEntity | null,
  ): boolean {
    if (!product.canPublish()) return false;
    if (!inventory || inventory.quantity.isZero()) return false;
    return true;
  }

  static canPurchase(
    product: ProductEntity,
    inventory: ProductInventoryEntity | null,
  ): boolean {
    if (!product.status.isPublished()) return false;
    if (!inventory) return false;
    return inventory.available > 0;
  }
}
