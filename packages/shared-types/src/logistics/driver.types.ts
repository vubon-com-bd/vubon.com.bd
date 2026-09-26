/**
 * Driver Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/driver.constants থেকে।
 */

import type {
  DRIVER_STATUS,
  DRIVER_TYPE,
  DRIVER_LICENSE_TYPE,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { UserId, Phone, Email } from '../common/primitives';

export type DriverStatusValue = (typeof DRIVER_STATUS)[keyof typeof DRIVER_STATUS];

export type DriverTypeValue = (typeof DRIVER_TYPE)[keyof typeof DRIVER_TYPE];

export type DriverLicenseTypeValue = (typeof DRIVER_LICENSE_TYPE)[keyof typeof DRIVER_LICENSE_TYPE];

export interface Driver extends BaseEntity<string> {
  readonly userId?: UserId;
  readonly name: string;
  readonly phone: Phone;
  readonly email?: Email;
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
}

export interface DriverPublic {
  readonly id: string;
  readonly name: string;
  readonly status: DriverStatusValue;
  readonly type: DriverTypeValue;
  readonly rating?: number;
  readonly totalDeliveries: number;
  readonly isAvailable: boolean;
}

export interface DriverListFilter {
  readonly status?: DriverStatusValue;
  readonly type?: DriverTypeValue;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly isAvailable?: boolean;
  readonly search?: string;
}
