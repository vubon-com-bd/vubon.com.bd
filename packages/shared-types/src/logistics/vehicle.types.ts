/**
 * Vehicle Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/vehicle.constants থেকে।
 */

import type {
  VEHICLE_STATUS,
  VEHICLE_TYPE,
  VEHICLE_FUEL_TYPE,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';

export type VehicleStatusValue = (typeof VEHICLE_STATUS)[keyof typeof VEHICLE_STATUS];

export type VehicleTypeValue = (typeof VEHICLE_TYPE)[keyof typeof VEHICLE_TYPE];

export type VehicleFuelTypeValue = (typeof VEHICLE_FUEL_TYPE)[keyof typeof VEHICLE_FUEL_TYPE];

export interface Vehicle extends BaseEntity<string> {
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
  readonly isActive: boolean;
}

export interface VehiclePublic {
  readonly id: string;
  readonly registrationNumber: string;
  readonly type: VehicleTypeValue;
  readonly status: VehicleStatusValue;
  readonly make: string;
  readonly model: string;
}

export interface VehicleListFilter {
  readonly status?: VehicleStatusValue;
  readonly type?: VehicleTypeValue;
  readonly fuelType?: VehicleFuelTypeValue;
  readonly search?: string;
}
