/**
 * InventoryLocationMapper
 */
import type { InventoryLocationEntity } from '@domain/entities/inventory-location.entity';
import type {
  InventoryLocationResponseDTO,
  InventoryLocationSummaryResponseDTO,
  InventoryLocationListResponseDTO,
  InventoryLocationStatsResponseDTO,
} from '@application/dtos/responses/inventory-location/index.js';

export class InventoryLocationMapper {
  static toResponse(e: InventoryLocationEntity): InventoryLocationResponseDTO {
    return {
      id: e.id,
      warehouseId: e.warehouseId,
      code: e.code.value,
      name: e.name.value,
      zone: e.zone,
      aisle: e.aisle,
      rack: e.rack,
      shelf: e.shelf,
      bin: e.bin,
      barcode: e.barcode,
      maxCapacityKg: e.maxCapacityKg,
      maxCapacityM3: e.maxCapacityM3,
      currentKg: e.currentKg,
      currentM3: e.currentM3,
      status: e.status.value,
      isQuarantine: e.isQuarantine,
      isPickable: e.isPickable,
      priority: e.priority,
      availableKg: e.availableKg(),
      availableM3: e.availableM3(),
      utilizationPercentKg: e.utilizationPercentKg(),
      utilizationPercentM3: e.utilizationPercentM3(),
      displayLocation: e.displayLocation,
      activatedAt: e.activatedAt,
      deactivatedAt: e.deactivatedAt,
      quarantinedAt: e.quarantinedAt,
      archivedAt: e.archivedAt,
      reason: e.reason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: InventoryLocationEntity): InventoryLocationSummaryResponseDTO {
    return {
      id: e.id,
      code: e.code.value,
      name: e.name.value,
      warehouseId: e.warehouseId,
      zone: e.zone,
      status: e.status.value,
      isPickable: e.isPickable,
      utilizationPercentKg: e.utilizationPercentKg(),
      displayLocation: e.displayLocation,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly InventoryLocationEntity[],
    total: number,
    page: number,
    limit: number,
  ): InventoryLocationListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  static toStatsResponse(stats: {
    total: number;
    byZone: Readonly<Record<string, number>>;
    activeCount: number;
    pickableCount: number;
    quarantineCount: number;
  }): InventoryLocationStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
