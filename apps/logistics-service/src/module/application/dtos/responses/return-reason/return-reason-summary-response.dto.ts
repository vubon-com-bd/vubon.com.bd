import type { ReturnReasonLabelValue } from '@domain/primitives/return-reason-label.vo';

export interface ReturnReasonSummaryResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly label: ReturnReasonLabelValue;
  readonly isActive: boolean;
  readonly priority: number;
}
