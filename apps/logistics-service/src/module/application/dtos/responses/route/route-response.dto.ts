/**
 * Route Response DTOs
 * @module logistics-service/application/dtos/responses/route
 */
import type { RouteTypeValue, RouteStatusValue, RouteOptimizationValue } from '@vubon/shared-types/logistics';

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
  readonly isOptimized: boolean;
  readonly isRecurring: boolean;
  readonly recurrenceRule?: string;
  readonly stopCount: number;
  readonly completedStops: number;
  readonly progressPercent: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RouteListResponseDTO {
  readonly items: readonly RouteResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
