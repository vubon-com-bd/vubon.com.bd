/**
 * Warehouse Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/warehouse.constants থেকে।
 */

import type {
  WAREHOUSE_STATUS,
  WAREHOUSE_TYPE,
  WAREHOUSE_ZONE,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { Address } from '../common/geo';
import type { UserId, Email, Phone } from '../common/primitives';

export type WarehouseStatusValue = (typeof WAREHOUSE_STATUS)[keyof typeof WAREHOUSE_STATUS];

export type WarehouseTypeValue = (typeof WAREHOUSE_TYPE)[keyof typeof WAREHOUSE_TYPE];

export type WarehouseZoneValue = (typeof WAREHOUSE_ZONE)[keyof typeof WAREHOUSE_ZONE];

export interface Warehouse extends BaseEntity<string> {
  readonly name: string;
  readonly code: string;
  readonly type: WarehouseTypeValue;
  readonly status: WarehouseStatusValue;
  readonly address: Address;
  readonly contactName?: string;
  readonly contactPhone?: Phone;
  readonly contactEmail?: Email;
  readonly managerId?: UserId;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
  readonly usedCapacityM3?: number;
  readonly usedCapacityKg?: number;
  readonly maxSkus?: number;
  readonly zone: WarehouseZoneValue;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault: boolean;
}

export interface WarehousePublic {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: WarehouseTypeValue;
  readonly status: WarehouseStatusValue;
  readonly address: Address;
}

export interface WarehouseCapacity {
  readonly warehouseId: string;
  readonly capacityM3: number;
  readonly usedCapacityM3: number;
  readonly capacityKg: number;
  readonly usedCapacityKg: number;
  readonly utilizationPercent: number;
  readonly isFull: boolean;
}
