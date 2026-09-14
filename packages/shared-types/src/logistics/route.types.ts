/**
 * Route Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/route.constants থেকে।
 */

import type {
  ROUTE_STATUS,
  ROUTE_TYPE,
  ROUTE_OPTIMIZATION,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';

export type RouteStatusValue = (typeof ROUTE_STATUS)[keyof typeof ROUTE_STATUS];

export type RouteTypeValue = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

export type RouteOptimizationValue = (typeof ROUTE_OPTIMIZATION)[keyof typeof ROUTE_OPTIMIZATION];

export interface Route extends BaseEntity<string> {
  readonly name: string;
  readonly code: string;
  readonly type: RouteTypeValue;
  readonly status: RouteStatusValue;
  readonly optimization: RouteOptimizationValue;
  readonly stops: readonly RouteStop[];
  readonly totalDistanceKm?: number;
  readonly totalDurationMinutes?: number;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDate: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly isOptimized: boolean;
  readonly isRecurring: boolean;
  readonly recurrenceRule?: string;
}

export interface RouteStop {
  readonly id: string;
  readonly order: number;
  readonly location: string;
  readonly address: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly shipmentIds: readonly string[];
  readonly estimatedArrivalAt?: string;
  readonly actualArrivalAt?: string;
  readonly completed: boolean;
  readonly notes?: string;
}

export interface RoutePublic {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: RouteTypeValue;
  readonly status: RouteStatusValue;
  readonly totalStops: number;
  readonly scheduledDate: string;
}
