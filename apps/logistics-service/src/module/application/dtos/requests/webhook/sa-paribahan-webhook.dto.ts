/**
 * SA Paribahan Webhook DTO
 * @module logistics-service/application/dtos/requests/webhook
 */
export interface SaParibahanWebhookDTO {
  readonly consignmentId: string;
  readonly trackingNumber: string;
  readonly status: 'booked' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'returned' | 'cancelled';
  readonly location: string;
  readonly occurredAt: string;
  readonly receiverName?: string;
  readonly signature?: string;
  readonly remarks?: string;
}
