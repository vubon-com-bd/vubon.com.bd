export type DriverStatus = 'available' | 'on_duty' | 'off_duty' | 'suspended';

export interface Driver {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly phone: string;
  readonly licenseNumber: string;
  readonly status: DriverStatus;
  readonly rating?: number;
  readonly assignedVehicleId?: string;
}

export interface DriverListResponse {
  readonly drivers: readonly Driver[];
  readonly total: number;
}
