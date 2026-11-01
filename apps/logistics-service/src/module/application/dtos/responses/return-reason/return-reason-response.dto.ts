import type { ReturnReasonTypeValue } from '@domain/primitives/return-reason-type.vo';
import type { ReturnReasonLabelValue } from '@domain/primitives/return-reason-label.vo';

export interface ReturnReasonResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly type: ReturnReasonTypeValue;
  readonly label: ReturnReasonLabelValue;
  readonly description?: string;
  readonly requiresPhoto: boolean;
  readonly autoApprove: boolean;
  readonly isActive: boolean;
  readonly priority: number;
  readonly deactivatedAt?: string;
  readonly deactivateReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
