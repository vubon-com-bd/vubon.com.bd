/**
 * SendGrid Webhook Request DTO
 * @module notification-service/application/dtos/requests/provider-webhook
 */
import type {
  SendgridWebhookRequestSchemaType,
  SendgridEventSchemaType,
} from '@vubon/shared-schemas/platform';

export type SendgridWebhookRequestDTO = SendgridWebhookRequestSchemaType;
export type SendgridEventDTO = SendgridEventSchemaType;

export interface HandleSendgridWebhookCommandDTO {
  readonly events: SendgridWebhookRequestDTO;
  readonly signature?: string;
  readonly timestamp?: string;
}
