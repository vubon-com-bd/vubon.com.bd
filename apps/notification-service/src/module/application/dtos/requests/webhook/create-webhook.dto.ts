/**
 * Create Webhook Request DTO
 * @module notification-service/application/dtos/requests/webhook
 */
import type { CreateWebhookRequestSchemaType } from '@vubon/shared-schemas/platform';

export type CreateWebhookRequestDTO = CreateWebhookRequestSchemaType;

export interface CreateWebhookCommandDTO extends CreateWebhookRequestDTO {
  readonly actorId?: string;
}
