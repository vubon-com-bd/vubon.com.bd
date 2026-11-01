import type { VehicleTypeValue } from '@domain/primitives/vehicle-type.vo';
import type { VehicleFuelTypeValue } from '@domain/primitives/vehicle-fuel-type.vo';

export interface CreateVehicleRequestDTO {
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
  readonly warehouseId?: string;
}
