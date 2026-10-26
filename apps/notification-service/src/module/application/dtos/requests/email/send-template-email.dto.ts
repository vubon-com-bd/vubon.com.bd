/**
 * Send Template Email Request DTO
 * @module notification-service/application/dtos/requests/email
 */
import type { SendTemplateEmailRequestSchemaType } from '@vubon/shared-schemas/platform';

export type SendTemplateEmailRequestDTO = SendTemplateEmailRequestSchemaType;

export interface SendTemplateEmailCommandDTO extends SendTemplateEmailRequestDTO {
  readonly actorId?: string;
}
