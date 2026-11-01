/**
 * OutForDeliveryRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface OutForDeliveryRequestDTO {
  readonly shipmentId: string;
  readonly driverId?: string;
}

export interface OutForDeliveryContextDTO {
  readonly request: OutForDeliveryRequestDTO;
  readonly actorId: string;
}
