/**
 * Pathao Webhook DTO
 * @module logistics-service/application/dtos/requests/webhook
 */
export interface PathaoWebhookDTO {
  readonly consignment_id: string;
  readonly merchant_order_id: string;
  readonly order_status: 'Pickup_Requested' | 'Picked' | 'Pickup_Failed' | 'Pickup_Cancelled'
    | 'In_Transit' | 'Delivered' | 'Delivery_Failed' | 'Return' | 'Returned';
  readonly updated_at: string;
  readonly delivery_fee: number;
  readonly rider_name?: string;
  readonly rider_phone?: string;
}
