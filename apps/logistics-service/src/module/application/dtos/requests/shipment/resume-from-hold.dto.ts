/**
 * ResumeFromHoldRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface ResumeFromHoldRequestDTO {
  readonly shipmentId: string;
}

export interface ResumeFromHoldContextDTO {
  readonly request: ResumeFromHoldRequestDTO;
  readonly actorId: string;
}
