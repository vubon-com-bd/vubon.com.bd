/**
 * Twilio Webhook Request DTO
 * @module notification-service/application/dtos/requests/provider-webhook
 */
import type { TwilioWebhookRequestSchemaType } from '@vubon/shared-schemas/platform';

export type TwilioWebhookRequestDTO = TwilioWebhookRequestSchemaType;

export interface HandleTwilioWebhookCommandDTO {
  readonly payload: TwilioWebhookRequestDTO;
  readonly signature?: string;
}
