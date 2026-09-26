/**
 * FileComplaintRequestDTO — matches ComplaintCreateInputSchema
 * @module support-service/application/dtos/requests/complaint
 */
import type {
  ComplaintTypeValue,
  ComplaintSeverityValue,
} from '@vubon/shared-types/support';

export interface FileComplaintRequestDTO {
  readonly subject: string;
  readonly description: string;
  readonly type: ComplaintTypeValue;
  readonly severity: ComplaintSeverityValue;
  readonly userId?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly attachments?: readonly string[];
}
