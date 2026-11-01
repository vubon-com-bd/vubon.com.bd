/**
 * Send Bulk SMS Request DTO
 * @module notification-service/application/dtos/requests/sms
 */
import type { SendBulkSmsRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendBulkSmsRequestDTO = SendBulkSmsRequestSchemaType;

export interface SendBulkSmsCommandDTO extends SendBulkSmsRequestDTO {
  readonly actorId?: string;
}
