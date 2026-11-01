import type { VehicleEntity } from '@domain/entities/vehicle.entity';
import type {
  VehicleResponseDTO,
  VehicleSummaryResponseDTO,
  VehicleListResponseDTO,
  VehicleStatsResponseDTO,
} from '@application/dtos/responses/vehicle/index.js';

export class VehicleMapper {
  static toResponse(e: VehicleEntity): VehicleResponseDTO {
    return {
      id: e.id,
      registrationNumber: e.registrationNumber.value,
      type: e.type.value,
      status: e.status.value,
      fuelType: e.fuelType.value,
      make: e.make,
      model: e.model,
      year: e.year,
      color: e.color,
      maxWeightKg: e.maxWeightKg,
      maxVolumeM3: e.maxVolumeM3,
      capacity: e.capacity,
      mileageKm: e.mileageKm,
      lastServiceAt: e.lastServiceAt,
      nextServiceAt: e.nextServiceAt,
      insuranceExpiresAt: e.insuranceExpiresAt,
      registrationExpiresAt: e.registrationExpiresAt,
      assignedDriverId: e.assignedDriverId,
      warehouseId: e.warehouseId,
      isActive: e.isActive,
      maintenanceStartedAt: e.maintenanceStartedAt,
      maintenanceCompletedAt: e.maintenanceCompletedAt,
      retiredAt: e.retiredAt,
      maintenanceReason: e.maintenanceReason,
      retirementReason: e.retirementReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: VehicleEntity): VehicleSummaryResponseDTO {
    return {
      id: e.id,
      registrationNumber: e.registrationNumber.value,
      type: e.type.value,
      status: e.status.value,
      make: e.make,
      model: e.model,
      year: e.year,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly VehicleEntity[],
    total: number,
    page: number,
    limit: number,
  ): VehicleListResponseDTO {
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
    byFuelType: Readonly<Record<string, number>>;
    availableCount: number;
    inUseCount: number;
  }): VehicleStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
