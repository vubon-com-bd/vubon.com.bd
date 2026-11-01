/**
 * PickUpShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface PickUpShipmentRequestDTO {
  readonly shipmentId: string;
  readonly courierId?: string;
  readonly driverId?: string;
}

export interface PickUpShipmentContextDTO {
  readonly request: PickUpShipmentRequestDTO;
  readonly actorId: string;
}
