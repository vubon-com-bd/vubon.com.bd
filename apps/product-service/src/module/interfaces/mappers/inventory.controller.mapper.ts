/**
 * InventoryControllerMapper
 */
import type { InventoryResponseDTO as AppInventoryDTO } from '../../application/dtos/responses/inventory-response.dto.js';
import { InventoryResponseDTO } from '../dtos/responses/inventory.response.dto.js';

export class InventoryControllerMapper {
  static toHttp(dto: AppInventoryDTO): InventoryResponseDTO {
    const out = new InventoryResponseDTO();
    Object.assign(out, {
      id: dto.id,
      productId: String(dto.productId),
      variantId: dto.variantId ? String(dto.variantId) : undefined,
      sku: dto.sku,
      quantity: dto.quantity,
      reserved: dto.reserved,
      available: dto.available,
      status: dto.status,
      lowStockThreshold: dto.lowStockThreshold,
      trackQuantity: dto.trackQuantity,
      allowBackorder: dto.allowBackorder,
      locationId: dto.locationId,
      lastRestockedAt: dto.lastRestockedAt,
      updatedAt: dto.updatedAt,
    });
    return out;
  }

  static toHttpList(dtos: readonly AppInventoryDTO[]): readonly InventoryResponseDTO[] {
    return dtos.map((d) => InventoryControllerMapper.toHttp(d));
  }
}
