export interface UpdateCapacityRequestDTO {
  readonly warehouseId: string;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
  readonly usedCapacityM3?: number;
  readonly usedCapacityKg?: number;
}
