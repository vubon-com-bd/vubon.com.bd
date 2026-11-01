import type { VehicleStatusValue } from '@domain/primitives/vehicle-status.vo';
import type { VehicleTypeValue } from '@domain/primitives/vehicle-type.vo';
import type { VehicleFuelTypeValue } from '@domain/primitives/vehicle-fuel-type.vo';

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
  readonly mileageKm?: number;
  readonly lastServiceAt?: string;
  readonly nextServiceAt?: string;
  readonly insuranceExpiresAt?: string;
  readonly registrationExpiresAt?: string;
  readonly assignedDriverId?: string;
  readonly warehouseId?: string;
  readonly isActive: boolean;
  readonly maintenanceStartedAt?: string;
  readonly maintenanceCompletedAt?: string;
  readonly retiredAt?: string;
  readonly maintenanceReason?: string;
  readonly retirementReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
