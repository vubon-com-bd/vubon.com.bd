/**
 * Send Bulk Push Request DTO
 * @module notification-service/application/dtos/requests/push
 */
import type { SendBulkPushRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendBulkPushRequestDTO = SendBulkPushRequestSchemaType;

export interface SendBulkPushCommandDTO extends SendBulkPushRequestDTO {
  readonly actorId?: string;
}
