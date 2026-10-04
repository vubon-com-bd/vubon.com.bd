/**
 * Webhook Response DTOs
 * @module payment-service/application/dtos/responses
 */
export interface WebhookEventResponseDTO {
  readonly id: string;
  readonly gateway: string;
  readonly gatewayEventId: string;
  readonly eventType: string;
  readonly verified: boolean;
  readonly processed: boolean;
  readonly attempts: number;
  readonly paymentId?: string;
  readonly receivedAt: string;
  readonly verifiedAt?: string;
  readonly processedAt?: string;
  readonly failedAt?: string;
}

export interface WebhookProcessResponseDTO {
  readonly success: true;
  readonly webhookId: string;
  readonly processed: boolean;
  readonly paymentId?: string;
}

export interface WebhookListResponseDTO {
  readonly items: readonly WebhookEventResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
