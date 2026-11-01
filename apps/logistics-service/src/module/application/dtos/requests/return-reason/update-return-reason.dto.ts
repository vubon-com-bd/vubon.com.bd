import type { ReturnReasonLabelValue } from '@domain/primitives/return-reason-label.vo';

export interface UpdateReturnReasonRequestDTO {
  readonly reasonId: string;
  readonly label?: ReturnReasonLabelValue;
  readonly description?: string;
  readonly requiresPhoto?: boolean;
  readonly autoApprove?: boolean;
  readonly priority?: number;
}
