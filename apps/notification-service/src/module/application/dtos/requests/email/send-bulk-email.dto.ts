/**
 * Send Bulk Email Request DTO
 * @module notification-service/application/dtos/requests/email
 */
import type { SendBulkEmailRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendBulkEmailRequestDTO = SendBulkEmailRequestSchemaType;

export interface SendBulkEmailCommandDTO extends SendBulkEmailRequestDTO {
  readonly actorId?: string;
}
