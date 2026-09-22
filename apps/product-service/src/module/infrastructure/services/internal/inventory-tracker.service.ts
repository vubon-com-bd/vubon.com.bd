import { Injectable } from '@nestjs/common';
import type { ProductInventoryRepository } from '../../../domain/repositories/product-inventory.repository.interface';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';

@Injectable()
export class InventoryTrackerService {
  constructor(private readonly inventoryRepo: ProductInventoryRepository) {}

  async hasStock(productId: string, quantity: number): Promise<boolean> {
    const inventory = await this.inventoryRepo.findByProduct(
      ProductIdVO.create(productId),
    );
    if (!inventory) return false;
    return inventory.available >= quantity;
  }
}
