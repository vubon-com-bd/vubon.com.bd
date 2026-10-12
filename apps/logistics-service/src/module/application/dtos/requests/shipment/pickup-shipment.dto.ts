/**
 * PickupShipmentRequestDto — input for PickupShipmentCommand
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface PickupShipmentRequestDto {
  readonly shipmentId: string;
  readonly courierTrackingNumber?: string;
  readonly pickedUpBy?: string;
}
