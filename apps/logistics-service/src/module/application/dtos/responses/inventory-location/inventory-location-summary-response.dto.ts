import type { InventoryLocationStatusValue } from '@domain/primitives/inventory-location-status.vo';

export interface InventoryLocationSummaryResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly warehouseId: string;
  readonly zone: string;
  readonly status: InventoryLocationStatusValue;
  readonly isPickable: boolean;
  readonly utilizationPercentKg: number;
  readonly displayLocation: string;
  readonly createdAt: string;
}
