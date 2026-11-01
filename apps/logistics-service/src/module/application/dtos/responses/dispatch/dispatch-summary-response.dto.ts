import type { DispatchStatusValue } from '@domain/primitives/dispatch-status.vo';
import type { DispatchTypeValue } from '@domain/primitives/dispatch-type.vo';

export interface DispatchSummaryResponseDTO {
  readonly id: string;
  readonly dispatchNumber: string;
  readonly status: DispatchStatusValue;
  readonly type: DispatchTypeValue;
  readonly itemCount: number;
  readonly createdAt: string;
}
