/**
 * Send SMS Request DTO
 * @module notification-service/application/dtos/requests/sms
 */
import type { SendSmsRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendSmsRequestDTO = SendSmsRequestSchemaType;

export interface SendSmsCommandDTO extends SendSmsRequestDTO {
  readonly actorId?: string;
}
