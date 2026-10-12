/**
 * Driver Response DTOs
 * @module logistics-service/application/dtos/responses/driver
 */
import type { DriverTypeValue, DriverStatusValue, DriverLicenseTypeValue } from '@vubon/shared-types/logistics';

export interface DriverResponseDTO {
  readonly id: string;
  readonly userId?: string;
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly status: DriverStatusValue;
  readonly type: DriverTypeValue;
  readonly licenseNumber: string;
  readonly licenseType: DriverLicenseTypeValue;
  readonly licenseExpiresAt: string;
  readonly dateOfBirth?: string;
  readonly address?: string;
  readonly vehicleId?: string;
  readonly warehouseId?: string;
  readonly rating?: number;
  readonly totalDeliveries: number;
  readonly totalDistanceKm: number;
  readonly cashLimit: number;
  readonly cashInHand: number;
  readonly isAvailable: boolean;
  readonly lastActiveAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DriverListResponseDTO {
  readonly items: readonly DriverResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
