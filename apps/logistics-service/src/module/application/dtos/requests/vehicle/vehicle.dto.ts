/**
 * Vehicle Request DTOs
 * @module logistics-service/application/dtos/requests/vehicle
 */
import type { VehicleTypeValue, VehicleStatusValue, VehicleFuelTypeValue } from '@vubon/shared-types/logistics';

export interface RegisterVehicleRequestDTO {
  readonly registrationNumber: string;
  readonly type: VehicleTypeValue;
  readonly fuelType: VehicleFuelTypeValue;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly color?: string;
  readonly maxWeightKg: number;
  readonly maxVolumeM3?: number;
  readonly capacity?: number;
  readonly mileageKm?: number;
  readonly insuranceExpiresAt?: string;
  readonly registrationExpiresAt?: string;
}

export interface UpdateVehicleRequestDTO {
  readonly vehicleId: string;
  readonly mileageKm?: number;
  readonly color?: string;
  readonly insuranceExpiresAt?: string;
  readonly registrationExpiresAt?: string;
}

export interface SetVehicleStatusRequestDTO {
  readonly vehicleId: string;
  readonly status: VehicleStatusValue;
  readonly reason?: string;
}

export interface AssignVehicleDriverRequestDTO {
  readonly vehicleId: string;
  readonly driverId: string;
}

export interface UpdateVehicleMileageRequestDTO {
  readonly vehicleId: string;
  readonly mileageKm: number;
}

export interface VehicleListFilterDTO {
  readonly status?: VehicleStatusValue;
  readonly type?: VehicleTypeValue;
  readonly fuelType?: VehicleFuelTypeValue;
  readonly hasDriver?: boolean;
  readonly minCapacityKg?: number;
  readonly search?: string;
}
