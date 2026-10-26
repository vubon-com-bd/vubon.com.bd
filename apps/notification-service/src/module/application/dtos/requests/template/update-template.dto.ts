/**
 * Update Notification Template Request DTO
 * @module notification-service/application/dtos/requests/template
 */
import type { UpdateNotificationTemplateRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UpdateTemplateRequestDTO = UpdateNotificationTemplateRequestSchemaType;

export interface UpdateTemplateCommandDTO extends UpdateTemplateRequestDTO {
  readonly actorId?: string;
}
