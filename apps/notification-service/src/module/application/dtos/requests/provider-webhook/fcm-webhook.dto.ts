/**
 * FCM Webhook Request DTO
 * @module notification-service/application/dtos/requests/provider-webhook
 */
import type { FcmWebhookRequestSchemaType } from '@vubon/shared-schemas/platform';

export type FcmWebhookRequestDTO = FcmWebhookRequestSchemaType;

export interface HandleFcmWebhookCommandDTO {
  readonly payload: FcmWebhookRequestDTO;
  readonly signature?: string;
}
