import type { DispatchTypeValue } from '@domain/primitives/dispatch-type.vo';

export interface CreateDispatchRequestDTO {
  readonly type: DispatchTypeValue;
  readonly shipmentIds: readonly string[];
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly totalWeight?: number;
  readonly estimatedArrivalAt?: string;
  readonly notes?: string;
}
