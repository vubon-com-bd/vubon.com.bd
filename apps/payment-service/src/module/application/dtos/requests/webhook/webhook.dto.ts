/**
 * Webhook Request DTOs
 * @module payment-service/application/dtos/requests/webhook
 */
export interface ProcessWebhookRequestDTO {
  readonly gateway: string;
  readonly gatewayEventId: string;
  readonly eventType: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly signature?: string;
  readonly receivedAt?: string;
}

export interface ListWebhookEventsRequestDTO {
  readonly page: number;
  readonly limit: number;
  readonly gateway?: string;
  readonly eventType?: string;
  readonly processed?: boolean;
  readonly verified?: boolean;
  readonly paymentId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}
