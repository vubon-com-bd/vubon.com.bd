import type { RouteStatusValue } from '@domain/primitives/route-status.vo';
import type { RouteTypeValue } from '@domain/primitives/route-type.vo';
import type { RouteOptimizationValue } from '@domain/primitives/route-optimization.vo';

export interface RouteStopResponseDTO {
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

export interface RouteResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: RouteTypeValue;
  readonly status: RouteStatusValue;
  readonly optimization: RouteOptimizationValue;
  readonly stops: readonly RouteStopResponseDTO[];
  readonly totalDistanceKm?: number;
  readonly totalDurationMinutes?: number;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDate: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly cancelledAt?: string;
  readonly cancelReason?: string;
  readonly isOptimized: boolean;
  readonly isRecurring: boolean;
  readonly recurrenceRule?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
