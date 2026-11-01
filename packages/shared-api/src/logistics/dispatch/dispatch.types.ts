export type DispatchStatus = 'planned' | 'dispatched' | 'completed' | 'cancelled';

export interface Dispatch {
  readonly id: string;
  readonly shipmentIds: readonly string[];
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly status: DispatchStatus;
  readonly scheduledAt: string;
  readonly completedAt?: string;
}

export interface CreateDispatchRequest {
  readonly shipmentIds: readonly string[];
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly scheduledAt: string;
}

export interface DispatchListResponse {
  readonly dispatches: readonly Dispatch[];
  readonly total: number;
}
