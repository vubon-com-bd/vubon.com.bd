export interface UpdateRouteRequestDTO {
  readonly routeId: string;
  readonly name?: string;
  readonly optimization?: string;
  readonly scheduledDate?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
}
