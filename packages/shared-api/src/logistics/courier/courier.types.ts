export interface Courier {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly phone?: string;
  readonly email?: string;
  readonly trackingUrlTemplate?: string;
  readonly active: boolean;
  readonly serviceAreas?: readonly string[];
}

export interface CourierListResponse {
  readonly couriers: readonly Courier[];
  readonly total: number;
}
