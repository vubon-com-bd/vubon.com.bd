/**
 * AssignCourierRequestDTO
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface AssignCourierRequestDTO {
  readonly shipmentId: string;
  readonly courierId: string;
  readonly courierTrackingNumber?: string;
}

export interface AssignCourierContextDTO {
  readonly request: AssignCourierRequestDTO;
  readonly actorId: string;
}
