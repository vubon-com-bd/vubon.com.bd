/**
 * MarkDelayedRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface MarkDelayedRequestDTO {
  readonly shipmentId: string;
  readonly reason: string;
  readonly newEstimatedDeliveryAt?: string;
}

export interface MarkDelayedContextDTO {
  readonly request: MarkDelayedRequestDTO;
  readonly actorId: string;
}
