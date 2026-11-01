export interface StartMaintenanceRequestDTO {
  readonly warehouseId: string;
  readonly reason?: string;
}
export interface EndMaintenanceRequestDTO {
  readonly warehouseId: string;
}
