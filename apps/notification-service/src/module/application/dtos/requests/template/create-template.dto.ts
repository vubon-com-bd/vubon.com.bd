/**
 * Create Notification Template Request DTO
 * @module notification-service/application/dtos/requests/template
 *
 * Shape derives from CreateNotificationTemplateRequestSchema in @vubon/shared-schemas/platform.
 */
import type { CreateNotificationTemplateRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CreateTemplateRequestDTO = CreateNotificationTemplateRequestSchemaType;

export interface CreateTemplateCommandDTO extends CreateTemplateRequestDTO {
  readonly actorId?: string;
}
