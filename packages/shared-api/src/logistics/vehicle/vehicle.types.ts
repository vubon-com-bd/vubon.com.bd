export type VehicleKind = 'bike' | 'car' | 'van' | 'truck' | 'other';

export interface Vehicle {
  readonly id: string;
  readonly kind: VehicleKind;
  readonly plateNumber: string;
  readonly model?: string;
  readonly capacityKg?: number;
  readonly active: boolean;
}

export interface VehicleListResponse {
  readonly vehicles: readonly Vehicle[];
  readonly total: number;
}
