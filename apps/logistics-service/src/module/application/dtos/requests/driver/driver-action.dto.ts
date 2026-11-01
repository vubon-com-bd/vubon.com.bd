export interface DriverActionRequestDTO {
  readonly driverId: string;
}
export interface DeactivateDriverRequestDTO {
  readonly driverId: string;
  readonly reason?: string;
}
export interface SuspendDriverRequestDTO {
  readonly driverId: string;
  readonly reason: string;
}
export interface OnLeaveDriverRequestDTO {
  readonly driverId: string;
  readonly leaveEndAt?: string;
}
export interface AssignVehicleToDriverRequestDTO {
  readonly driverId: string;
  readonly vehicleId: string;
}
export interface CollectCashRequestDTO {
  readonly driverId: string;
  readonly amount: number;
  readonly currency?: string;
}
export interface DepositCashRequestDTO {
  readonly driverId: string;
  readonly amount: number;
  readonly currency?: string;
}
export interface RecordDeliveryRequestDTO {
  readonly driverId: string;
  readonly deliveryId: string;
  readonly distanceKm?: number;
}
