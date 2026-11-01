export interface AssignCourierToShipmentRequestDTO {
  readonly shipmentId: string;
  readonly courierId: string;
  readonly courierTrackingNumber?: string;
}
