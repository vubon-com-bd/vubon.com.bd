/**
 * Route Request DTOs
 * @module logistics-service/application/dtos/requests/route
 */
import type { RouteTypeValue, RouteStatusValue, RouteOptimizationValue } from '@vubon/shared-types/logistics';

export interface CreateRouteRequestDTO {
  readonly name: string;
  readonly code: string;
  readonly type: RouteTypeValue;
  readonly optimization: RouteOptimizationValue;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDate: string;
  readonly isRecurring?: boolean;
  readonly recurrenceRule?: string;
}

export interface AddRouteStopRequestDTO {
  readonly routeId: string;
  readonly stopId: string;
  readonly order: number;
  readonly location: string;
  readonly address: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly shipmentIds: readonly string[];
  readonly estimatedArrivalAt?: string;
  readonly notes?: string;
}

export interface RemoveRouteStopRequestDTO {
  readonly routeId: string;
  readonly stopId: string;
}

export interface ReorderRouteStopsRequestDTO {
  readonly routeId: string;
  readonly orderedStopIds: readonly string[];
}

export interface CompleteRouteStopRequestDTO {
  readonly routeId: string;
  readonly stopId: string;
}

export interface OptimizeRouteRequestDTO {
  readonly routeId: string;
  readonly startLat?: number;
  readonly startLng?: number;
}

export interface StartRouteRequestDTO { readonly routeId: string; }
export interface CompleteRouteRequestDTO { readonly routeId: string; }
export interface CancelRouteRequestDTO { readonly routeId: string; readonly reason: string; }
export interface PlanRouteRequestDTO { readonly routeId: string; }

export interface RouteListFilterDTO {
  readonly status?: RouteStatusValue;
  readonly type?: RouteTypeValue;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly warehouseId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
