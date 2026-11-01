/**
 * ConfirmShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface ConfirmShipmentRequestDTO {
  readonly shipmentId: string;
}

export interface ConfirmShipmentContextDTO {
  readonly request: ConfirmShipmentRequestDTO;
  readonly actorId: string;
}
