import type { DriverStatusValue } from '@domain/primitives/driver-status.vo';
import type { DriverTypeValue } from '@domain/primitives/driver-type.vo';
import type { DriverLicenseTypeValue } from '@domain/primitives/driver-license.vo';

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
  readonly totalDistanceKm?: number;
  readonly cashLimit?: number;
  readonly cashInHand?: number;
  readonly isAvailable: boolean;
  readonly lastActiveAt?: string;
  readonly onLeaveStartAt?: string;
  readonly onLeaveEndAt?: string;
  readonly suspendedAt?: string;
  readonly suspensionReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
