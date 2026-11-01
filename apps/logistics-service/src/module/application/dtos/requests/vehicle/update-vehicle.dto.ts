export interface UpdateVehicleRequestDTO {
  readonly vehicleId: string;
  readonly color?: string;
  readonly maxWeightKg?: number;
  readonly maxVolumeM3?: number;
  readonly capacity?: number;
  readonly mileageKm?: number;
  readonly insuranceExpiresAt?: string;
  readonly registrationExpiresAt?: string;
  readonly warehouseId?: string;
}
