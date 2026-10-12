/**
 * RedX Webhook DTO
 * @module logistics-service/application/dtos/requests/webhook
 */
export interface RedxWebhookDTO {
  readonly tracking_id: string;
  readonly parcel_id: string;
  readonly status: 'pending' | 'picked' | 'in_transit' | 'delivered' | 'returned' | 'cancelled';
  readonly status_update_at: string;
  readonly note?: string;
  readonly delivery_agent?: string;
  readonly delivery_agent_phone?: string;
}
