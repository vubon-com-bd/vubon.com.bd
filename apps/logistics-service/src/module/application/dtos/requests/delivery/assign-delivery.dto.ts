export interface AssignDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly driverId: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
}
