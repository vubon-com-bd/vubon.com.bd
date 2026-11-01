export interface UpdateWarehouseRequestDTO {
  readonly warehouseId: string;
  readonly address?: string;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly managerId?: string;
  readonly maxSkus?: number;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly isDefault?: boolean;
}
