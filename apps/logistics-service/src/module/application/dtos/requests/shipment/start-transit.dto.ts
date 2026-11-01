/**
 * StartTransitRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface StartTransitRequestDTO {
  readonly shipmentId: string;
  readonly currentLocation?: string;
}

export interface StartTransitContextDTO {
  readonly request: StartTransitRequestDTO;
  readonly actorId: string;
}
