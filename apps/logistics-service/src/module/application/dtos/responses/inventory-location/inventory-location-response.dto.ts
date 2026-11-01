/**
 * InventoryLocationResponseDTO
 */
import type { InventoryLocationStatusValue } from '@domain/primitives/inventory-location-status.vo';

export interface InventoryLocationResponseDTO {
  readonly id: string;
  readonly warehouseId: string;
  readonly code: string;
  readonly name: string;
  readonly zone: string;
  readonly aisle?: string;
  readonly rack?: string;
  readonly shelf?: string;
  readonly bin?: string;
  readonly barcode?: string;
  readonly maxCapacityKg?: number;
  readonly maxCapacityM3?: number;
  readonly currentKg: number;
  readonly currentM3: number;
  readonly status: InventoryLocationStatusValue;
  readonly isQuarantine: boolean;
  readonly isPickable: boolean;
  readonly priority: number;
  readonly availableKg: number;
  readonly availableM3: number;
  readonly utilizationPercentKg: number;
  readonly utilizationPercentM3: number;
  readonly displayLocation: string;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly quarantinedAt?: string;
  readonly archivedAt?: string;
  readonly reason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
