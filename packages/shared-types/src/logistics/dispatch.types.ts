/**
 * Dispatch Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/dispatch.constants থেকে।
 */

import type { DISPATCH_STATUS, DISPATCH_TYPE } from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';

export type DispatchStatusValue = (typeof DISPATCH_STATUS)[keyof typeof DISPATCH_STATUS];

export type DispatchTypeValue = (typeof DISPATCH_TYPE)[keyof typeof DISPATCH_TYPE];

export interface Dispatch extends BaseEntity<string> {
  readonly dispatchNumber: string;
  readonly status: DispatchStatusValue;
  readonly type: DispatchTypeValue;
  readonly shipmentIds: readonly string[];
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly manifestUrl?: string;
  readonly itemCount: number;
  readonly totalWeight?: number;
  readonly dispatchedAt?: string;
  readonly estimatedArrivalAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: string;
}

export interface DispatchPublic {
  readonly id: string;
  readonly dispatchNumber: string;
  readonly status: DispatchStatusValue;
  readonly type: DispatchTypeValue;
  readonly itemCount: number;
  readonly dispatchedAt?: string;
}

export interface DispatchCreateInput {
  readonly type: DispatchTypeValue;
  readonly shipmentIds: readonly string[];
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly notes?: string;
}
