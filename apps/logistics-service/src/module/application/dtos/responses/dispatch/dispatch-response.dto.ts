/**
 * Dispatch Response DTOs
 * @module logistics-service/application/dtos/responses/dispatch
 */
import type { DispatchTypeValue, DispatchStatusValue } from '@vubon/shared-types/logistics';

export interface DispatchResponseDTO {
  readonly id: string;
  readonly dispatchNumber: string;
  readonly status: DispatchStatusValue;
  readonly type: DispatchTypeValue;
  readonly shipmentIds: readonly string[];
  readonly shipmentCount: number;
  readonly itemCount: number;
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly manifestUrl?: string;
  readonly totalWeightKg?: number;
  readonly dispatchedAt?: string;
  readonly estimatedArrivalAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DispatchListResponseDTO {
  readonly items: readonly DispatchResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
