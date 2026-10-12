/**
 * CancelShipmentRequestDto — input for CancelShipmentCommand
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface CancelShipmentRequestDto {
  readonly shipmentId: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
}
