/**
 * ComplaintResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  ComplaintTypeValue,
  ComplaintStatusValue,
  ComplaintSeverityValue,
} from '@vubon/shared-types/support';

export interface ComplaintResponseDTO {
  readonly id: string;
  readonly complaintNumber: string;
  readonly subject: string;
  readonly description: string;
  readonly type: ComplaintTypeValue;
  readonly status: ComplaintStatusValue;
  readonly severity: ComplaintSeverityValue;
  readonly userId?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly attachments?: readonly string[];
  readonly assignedTo?: string;
  readonly resolution?: string;
  readonly acknowledgedAt?: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
  readonly reopenedAt?: string;
  readonly slaBreachedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
