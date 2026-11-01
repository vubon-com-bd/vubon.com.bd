import type { DispatchStatusValue } from '@domain/primitives/dispatch-status.vo';
import type { DispatchTypeValue } from '@domain/primitives/dispatch-type.vo';

export interface DispatchResponseDTO {
  readonly id: string;
  readonly dispatchNumber: string;
  readonly status: DispatchStatusValue;
  readonly type: DispatchTypeValue;
  readonly shipmentIds: readonly string[];
  readonly itemCount: number;
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly manifestUrl?: string;
  readonly totalWeight?: number;
  readonly dispatchedAt?: string;
  readonly inTransitAt?: string;
  readonly estimatedArrivalAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly returnReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
