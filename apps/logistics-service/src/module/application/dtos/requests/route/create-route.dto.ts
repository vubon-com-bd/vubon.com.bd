import type { RouteTypeValue } from '@domain/primitives/route-type.vo';
import type { RouteOptimizationValue } from '@domain/primitives/route-optimization.vo';

export interface RouteStopInputDTO {
  readonly id: string;
  readonly order: number;
  readonly location: string;
  readonly address: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly shipmentIds: readonly string[];
  readonly estimatedArrivalAt?: string;
  readonly notes?: string;
}

export interface CreateRouteRequestDTO {
  readonly name: string;
  readonly code: string;
  readonly type: RouteTypeValue;
  readonly optimization: RouteOptimizationValue;
  readonly stops: readonly RouteStopInputDTO[];
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDate: string;
  readonly isRecurring?: boolean;
  readonly recurrenceRule?: string;
}
