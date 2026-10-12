/**
 * Driver Request DTOs
 * @module logistics-service/application/dtos/requests/driver
 */
import type { DriverTypeValue, DriverStatusValue, DriverLicenseTypeValue } from '@vubon/shared-types/logistics';

export interface RegisterDriverRequestDTO {
  readonly userId?: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly type: DriverTypeValue;
  readonly licenseNumber: string;
  readonly licenseType: DriverLicenseTypeValue;
  readonly licenseExpiresAt: string;
  readonly dateOfBirth?: string;
  readonly address?: string;
  readonly warehouseId?: string;
  readonly cashLimit?: number;
}

export interface UpdateDriverRequestDTO {
  readonly driverId: string;
  readonly name?: string;
  readonly email?: string;
  readonly address?: string;
  readonly warehouseId?: string;
}

export interface SetDriverStatusRequestDTO {
  readonly driverId: string;
  readonly status: DriverStatusValue;
  readonly reason?: string;
}

export interface AssignDriverVehicleRequestDTO {
  readonly driverId: string;
  readonly vehicleId: string;
}

export interface ReceiveDriverCashRequestDTO {
  readonly driverId: string;
  readonly amount: number;
}

export interface RemitDriverCashRequestDTO {
  readonly driverId: string;
  readonly amount: number;
}

export interface DriverListFilterDTO {
  readonly status?: DriverStatusValue;
  readonly type?: DriverTypeValue;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly isAvailable?: boolean;
  readonly minRating?: number;
  readonly search?: string;
}
