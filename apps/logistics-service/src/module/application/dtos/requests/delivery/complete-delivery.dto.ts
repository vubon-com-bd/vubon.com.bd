export interface CompleteDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly recipientName?: string;
  readonly signedBy?: string;
}
