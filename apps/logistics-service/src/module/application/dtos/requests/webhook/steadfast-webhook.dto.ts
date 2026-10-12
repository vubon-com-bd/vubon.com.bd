/**
 * Steadfast Webhook DTO
 * @module logistics-service/application/dtos/requests/webhook
 */
export interface SteadfastWebhookDTO {
  readonly consignment_id: string;
  readonly invoice: string;
  readonly status: 'in_review' | 'pending' | 'delivered' | 'partial_delivered' | 'cancelled' | 'hold' | 'unknown';
  readonly delivery_status: string;
  readonly updated_at: string;
  readonly tracking_code?: string;
}
