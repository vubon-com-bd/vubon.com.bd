import type { VehicleEntity } from '../../domain/entities/vehicle.entity.js';
import type { VehicleResponseDTO, VehicleListResponseDTO } from '../dtos/responses/vehicle/vehicle-response.dto.js';
import type { VehicleTypeValue, VehicleStatusValue, VehicleFuelTypeValue } from '@vubon/shared-types/logistics';

export class VehicleMapper {
  static toResponse(e: VehicleEntity): VehicleResponseDTO {
    return {
      id: e.id, registrationNumber: e.registrationNumber,
      type: e.type.value as VehicleTypeValue,
      status: e.status.value as VehicleStatusValue,
      fuelType: e.fuelType.value as VehicleFuelTypeValue,
      make: e.make, model: e.model, year: e.year, color: e.color,
      maxWeightKg: e.maxWeightKg, maxVolumeM3: e.maxVolumeM3, capacity: e.capacity,
      mileageKm: e.mileageKm, lastServiceAt: e.lastServiceAt, nextServiceAt: e.nextServiceAt,
      insuranceExpiresAt: e.insuranceExpiresAt, registrationExpiresAt: e.registrationExpiresAt,
      assignedDriverId: e.assignedDriverId as unknown as string | undefined,
      isActive: e.isActive, createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly VehicleEntity[], total: number, page: number, limit: number): VehicleListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
