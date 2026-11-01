export interface UpdateInventoryLocationRequestDTO {
  readonly inventoryLocationId: string;
  readonly name?: string;
  readonly zone?: string;
  readonly aisle?: string;
  readonly rack?: string;
  readonly shelf?: string;
  readonly bin?: string;
  readonly barcode?: string;
  readonly maxCapacityKg?: number;
  readonly maxCapacityM3?: number;
  readonly isPickable?: boolean;
  readonly priority?: number;
}
