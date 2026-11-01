/**
 * FailShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface FailShipmentRequestDTO {
  readonly shipmentId: string;
  readonly reason: string;
  readonly attemptedCount?: number;
}

export interface FailShipmentContextDTO {
  readonly request: FailShipmentRequestDTO;
  readonly actorId: string;
}
