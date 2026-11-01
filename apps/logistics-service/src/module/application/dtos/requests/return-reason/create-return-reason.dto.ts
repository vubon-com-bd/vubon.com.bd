import type { ReturnReasonTypeValue } from '@domain/primitives/return-reason-type.vo';
import type { ReturnReasonLabelValue } from '@domain/primitives/return-reason-label.vo';

export interface CreateReturnReasonRequestDTO {
  readonly code: string;
  readonly type: ReturnReasonTypeValue;
  readonly label: ReturnReasonLabelValue;
  readonly description?: string;
  readonly requiresPhoto: boolean;
  readonly autoApprove: boolean;
  readonly priority?: number;
}
