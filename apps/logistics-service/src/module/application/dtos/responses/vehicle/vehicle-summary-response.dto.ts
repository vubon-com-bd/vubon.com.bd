import type { VehicleStatusValue } from '@domain/primitives/vehicle-status.vo';
import type { VehicleTypeValue } from '@domain/primitives/vehicle-type.vo';

export interface VehicleSummaryResponseDTO {
  readonly id: string;
  readonly registrationNumber: string;
  readonly type: VehicleTypeValue;
  readonly status: VehicleStatusValue;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly createdAt: string;
}
