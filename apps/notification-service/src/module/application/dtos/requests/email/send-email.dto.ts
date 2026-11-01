/**
 * Send Email Request DTO
 * @module notification-service/application/dtos/requests/email
 */
import type { SendEmailRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendEmailRequestDTO = SendEmailRequestSchemaType;

export interface SendEmailCommandDTO extends SendEmailRequestDTO {
  readonly actorId?: string;
}
