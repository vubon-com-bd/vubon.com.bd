/**
 * CancelShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface CancelShipmentRequestDTO {
  readonly shipmentId: string;
  readonly reason?: string;
}

export interface CancelShipmentContextDTO {
  readonly request: CancelShipmentRequestDTO;
  readonly actorId: string;
}
