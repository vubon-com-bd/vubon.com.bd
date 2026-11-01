/**
 * DeliverShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface DeliverShipmentRequestDTO {
  readonly shipmentId: string;
  readonly recipientName?: string;
  readonly signedBy?: string;
  readonly driverId?: string;
}

export interface DeliverShipmentContextDTO {
  readonly request: DeliverShipmentRequestDTO;
  readonly actorId: string;
}
