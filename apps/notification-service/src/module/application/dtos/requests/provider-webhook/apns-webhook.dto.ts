/**
 * APNs Webhook Request DTO
 * @module notification-service/application/dtos/requests/provider-webhook
 */
import type { ApnsWebhookRequestSchemaType } from '@vubon/shared-schemas/platform';

export type ApnsWebhookRequestDTO = ApnsWebhookRequestSchemaType;

export interface HandleApnsWebhookCommandDTO {
  readonly payload: ApnsWebhookRequestDTO;
  readonly signature?: string;
}
