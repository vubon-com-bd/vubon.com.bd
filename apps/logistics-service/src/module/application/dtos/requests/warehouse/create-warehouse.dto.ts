export interface CreateWarehouseRequestDTO {
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly address: string;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly managerId?: string;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
  readonly maxSkus?: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault?: boolean;
}
