/**
 * Vehicle Response DTOs
 * @module logistics-service/application/dtos/responses/vehicle
 */
import type { VehicleTypeValue, VehicleStatusValue, VehicleFuelTypeValue } from '@vubon/shared-types/logistics';

export interface VehicleResponseDTO {
  readonly id: string;
  readonly registrationNumber: string;
  readonly type: VehicleTypeValue;
  readonly status: VehicleStatusValue;
  readonly fuelType: VehicleFuelTypeValue;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly color?: string;
  readonly maxWeightKg: number;
  readonly maxVolumeM3?: number;
  readonly capacity?: number;
  readonly mileageKm: number;
  readonly lastServiceAt?: string;
  readonly nextServiceAt?: string;
  readonly insuranceExpiresAt?: string;
  readonly registrationExpiresAt?: string;
  readonly assignedDriverId?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VehicleListResponseDTO {
  readonly items: readonly VehicleResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
