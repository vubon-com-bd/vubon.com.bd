/**
 * InventoryMapper
 */
import { ProductInventoryEntity } from '../../domain/entities/product-inventory.entity.js';
import type { InventoryResponseDTO } from '../dtos/responses/inventory-response.dto.js';
import type { ProductId, VariantId } from '@vubon/shared-types/common';

export class InventoryMapper {
  static toResponse(inv: ProductInventoryEntity): InventoryResponseDTO {
    return {
      id: inv.id,
      productId: inv.productId.value as ProductId,
      variantId: inv.variantId?.value as VariantId | undefined,
      sku: inv.sku,
      quantity: inv.quantity,
      reserved: inv.reserved,
      available: inv.available,
      status: inv.getStatus(),
      lowStockThreshold: inv.threshold,
      trackQuantity: inv.trackQuantity,
      allowBackorder: inv.allowBackorder,
      locationId: inv.locationId,
      lastRestockedAt: inv.lastRestockedAt,
      updatedAt: inv.updatedAt,
    };
  }

  static toResponseList(inventory: readonly ProductInventoryEntity[]): readonly InventoryResponseDTO[] {
    return inventory.map((i) => InventoryMapper.toResponse(i));
  }
}
