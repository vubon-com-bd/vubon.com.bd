/**
 * PutOnHoldRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface PutOnHoldRequestDTO {
  readonly shipmentId: string;
  readonly reason: string;
}

export interface PutOnHoldContextDTO {
  readonly request: PutOnHoldRequestDTO;
  readonly actorId: string;
}
