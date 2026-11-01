/**
 * Update Webhook Request DTO
 * @module notification-service/application/dtos/requests/webhook
 */
import type { UpdateWebhookRequestSchemaType } from '@vubon/shared-schemas/platform';

export type UpdateWebhookRequestDTO = UpdateWebhookRequestSchemaType;

export interface UpdateWebhookCommandDTO extends UpdateWebhookRequestDTO {
  readonly actorId?: string;
}
