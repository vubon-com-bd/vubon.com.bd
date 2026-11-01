/**
 * Redx Webhook DTO
 * @module logistics-service/application/dtos/requests/webhook
 *
 * NOTE: Provider-specific signature verification and payload parsing
 * happens in infrastructure/external/couriers/redx/redx.service.ts
 * This DTO represents the normalized form after verification.
 */

export interface RedxWebhookPayload {
  readonly trackingNumber: string;
  readonly status: string;
  readonly occurredAt: string;
  readonly location?: string;
  readonly message?: string;
  readonly raw?: Readonly<Record<string, unknown>>;
}

export interface RedxWebhookRequestDTO {
  readonly signature?: string;
  readonly timestamp?: string;
  readonly body: RedxWebhookPayload;
}
