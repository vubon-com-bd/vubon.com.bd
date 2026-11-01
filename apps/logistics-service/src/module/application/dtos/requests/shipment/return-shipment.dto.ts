/**
 * ReturnShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface ReturnShipmentRequestDTO {
  readonly shipmentId: string;
  readonly returnReason?: string;
}

export interface ReturnShipmentContextDTO {
  readonly request: ReturnShipmentRequestDTO;
  readonly actorId: string;
}
