/**
 * InventoryMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { ProductInventoryEntity } from '../../domain/entities/product-inventory.entity.js';
import type { InventoryStatusValue } from '@vubon/shared-types/business/product';
import type {
  InventoryResponseDTO,
  InventoryPublicResponseDTO,
  InventorySummaryResponseDTO,
  InventoryListResponseDTO,
  InventoryStatsResponseDTO,
  StockCheckResponseDTO,
} from '../dtos/responses/inventory-response.dto.js';

export class InventoryMapper {
  static toResponse(entity: ProductInventoryEntity): InventoryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      variantId: vo.variantId?.value,
      vendorId: vo.vendorId?.value,
      sku: vo.sku.value,
      quantity: vo.quantity.value,
      reserved: vo.reserved.value,
      available: vo.available.value,
      status: vo.status.value as InventoryStatusValue,
      lowStockThreshold: vo.lowStockThreshold,
      locationId: vo.locationId,
      lastRestockedAt: vo.lastRestockedAt,
      updatedAt: vo.updatedAt,
    };
  }

  static toPublicResponse(entity: ProductInventoryEntity): InventoryPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      available: vo.available.value,
      status: vo.status.value as InventoryStatusValue,
    };
  }

  static toSummary(entity: ProductInventoryEntity): InventorySummaryResponseDTO {
    return {
      id: entity.id,
      sku: entity.sku.value,
      available: entity.available.value,
      status: entity.vo.status.value as InventoryStatusValue,
    };
  }

  static toListResponse(
    entities: readonly ProductInventoryEntity[],
    total: number,
    page: number,
    limit: number,
  ): InventoryListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toStatsResponse(stats: {
    totalRecords: number;
    inStockCount: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalQuantity: number;
    totalReserved: number;
    totalAvailable: number;
  }): InventoryStatsResponseDTO {
    return { ...stats };
  }

  static toStockCheckResponse(
    entity: ProductInventoryEntity,
    requestedQuantity: number,
  ): StockCheckResponseDTO {
    return {
      inventoryId: entity.id,
      sku: entity.sku.value,
      available: entity.available.value,
      canFulfill: entity.available.value >= requestedQuantity,
      requestedQuantity,
    };
  }
}
