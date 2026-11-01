import type { DriverStatusValue } from '@domain/primitives/driver-status.vo';
import type { DriverTypeValue } from '@domain/primitives/driver-type.vo';

export interface DriverSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly status: DriverStatusValue;
  readonly type: DriverTypeValue;
  readonly rating?: number;
  readonly totalDeliveries: number;
  readonly isAvailable: boolean;
  readonly createdAt: string;
}
