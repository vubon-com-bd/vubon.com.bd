import type { WarehouseEntity } from '@domain/entities/warehouse.entity';
import type {
  WarehouseResponseDTO,
  WarehouseSummaryResponseDTO,
  WarehouseListResponseDTO,
  WarehouseStatsResponseDTO,
} from '@application/dtos/responses/warehouse/index.js';

export class WarehouseMapper {
  static toResponse(e: WarehouseEntity): WarehouseResponseDTO {
    return {
      id: e.id,
      code: e.code.value,
      name: e.name.value,
      type: e.type,
      status: e.status.value,
      address: e.address,
      contactName: e.contactName,
      contactPhone: e.contactPhone,
      contactEmail: e.contactEmail,
      managerId: e.managerId,
      capacityM3: e.capacityM3,
      capacityKg: e.capacityKg,
      usedCapacityM3: e.usedCapacityM3,
      usedCapacityKg: e.usedCapacityKg,
      maxSkus: e.maxSkus,
      zone: e.zone,
      operatingHoursStart: e.operatingHoursStart,
      operatingHoursEnd: e.operatingHoursEnd,
      timezone: e.timezone,
      isDefault: e.isDefault,
      activatedAt: e.activatedAt,
      deactivatedAt: e.deactivatedAt,
      maintenanceStartedAt: e.maintenanceStartedAt,
      maintenanceEndedAt: e.maintenanceEndedAt,
      fullMarkedAt: e.fullMarkedAt,
      closedAt: e.closedAt,
      archivedAt: e.archivedAt,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: WarehouseEntity): WarehouseSummaryResponseDTO {
    return {
      id: e.id,
      code: e.code.value,
      name: e.name.value,
      type: e.type,
      status: e.status.value,
      zone: e.zone,
      isDefault: e.isDefault,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly WarehouseEntity[],
    total: number,
    page: number,
    limit: number,
  ): WarehouseListResponseDTO {
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
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
    totalCapacityM3: number;
    totalUsedM3: number;
    utilizationPercent: number;
  }): WarehouseStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
