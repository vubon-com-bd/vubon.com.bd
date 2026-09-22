import { ProductInventoryEntity } from '../../domain/entities/product-inventory.entity';
import type { InventoryResponseDTO } from '../dtos/responses/inventory-response.dto';

export class InventoryMapper {
  static toResponse(entity: ProductInventoryEntity): InventoryResponseDTO {
    return {
      productId: entity.productId.value,
      quantity: entity.quantity.value,
      reserved: entity.reserved.value,
      available: entity.available,
      status: entity.status.value,
    } as unknown as InventoryResponseDTO;
  }
}
