/**
 * UpdateShipmentRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface UpdateShipmentRequestDTO {
  readonly shipmentId: string;
  readonly shippingAddress?: string;
  readonly pickupAddress?: string;
  readonly notes?: string;
  readonly estimatedDeliveryAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface UpdateShipmentContextDTO {
  readonly request: UpdateShipmentRequestDTO;
  readonly actorId: string;
}
