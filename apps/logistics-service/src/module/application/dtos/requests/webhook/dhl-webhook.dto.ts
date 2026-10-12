/**
 * DHL Webhook DTO
 * @module logistics-service/application/dtos/requests/webhook
 */
export interface DhlWebhookDTO {
  readonly shipmentTrackingNumber: string;
  readonly eventCode: string;
  readonly eventDescription: string;
  readonly eventDateTime: string;
  readonly location: {
    readonly address: {
      readonly countryCode: string;
      readonly postalCode?: string;
      readonly addressLocality?: string;
    };
  };
  readonly statusCode?: string;
  readonly pieceIds?: readonly string[];
}
