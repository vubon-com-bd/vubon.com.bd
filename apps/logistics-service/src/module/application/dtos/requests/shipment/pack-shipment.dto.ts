/**
 * PackShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface PackShipmentRequestDTO {
  readonly shipmentId: string;
  readonly packageId?: string;
}

export interface PackShipmentContextDTO {
  readonly request: PackShipmentRequestDTO;
  readonly actorId: string;
}
