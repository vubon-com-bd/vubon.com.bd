export interface RouteActionRequestDTO {
  readonly routeId: string;
}
export interface OptimizeRouteRequestDTO {
  readonly routeId: string;
  readonly newDistanceKm?: number;
  readonly newDurationMinutes?: number;
}
export interface StartRouteRequestDTO {
  readonly routeId: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
}
export interface CompleteStopRequestDTO {
  readonly routeId: string;
  readonly stopId: string;
}
export interface CancelRouteRequestDTO {
  readonly routeId: string;
  readonly reason?: string;
}
