export interface VehicleActionRequestDTO {
  readonly vehicleId: string;
}
export interface AssignVehicleRequestDTO {
  readonly vehicleId: string;
  readonly dispatchId?: string;
  readonly driverId?: string;
}
export interface StartVehicleMaintenanceRequestDTO {
  readonly vehicleId: string;
  readonly reason?: string;
}
export interface RetireVehicleRequestDTO {
  readonly vehicleId: string;
  readonly reason?: string;
}
export interface AssignDriverToVehicleRequestDTO {
  readonly vehicleId: string;
  readonly driverId: string;
}
