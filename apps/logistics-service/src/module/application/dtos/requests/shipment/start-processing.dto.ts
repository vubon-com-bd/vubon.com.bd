/**
 * StartProcessingRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface StartProcessingRequestDTO {
  readonly shipmentId: string;
  readonly warehouseId?: string;
}

export interface StartProcessingContextDTO {
  readonly request: StartProcessingRequestDTO;
  readonly actorId: string;
}
