/**
 * Warehouse Request DTOs
 * @module logistics-service/application/dtos/requests/warehouse
 */
import type { Address } from '@vubon/shared-types/common';
import type { WarehouseTypeValue, WarehouseStatusValue } from '@vubon/shared-types/logistics';

export interface CreateWarehouseRequestDTO {
  readonly name: string;
  readonly code: string;
  readonly type: WarehouseTypeValue;
  readonly address: Address;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly capacityM3: number;
  readonly capacityKg: number;
  readonly maxSkus?: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone?: string;
  readonly isDefault?: boolean;
}

export interface UpdateWarehouseRequestDTO {
  readonly warehouseId: string;
  readonly name?: string;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
}

export interface ActivateWarehouseRequestDTO { readonly warehouseId: string; }
export interface DeactivateWarehouseRequestDTO { readonly warehouseId: string; readonly reason?: string; }
export interface StartMaintenanceRequestDTO { readonly warehouseId: string; readonly reason?: string; }
export interface CompleteMaintenanceRequestDTO { readonly warehouseId: string; }
export interface ReserveCapacityRequestDTO {
  readonly warehouseId: string;
  readonly volumeM3: number;
  readonly weightKg: number;
}
export interface ReleaseCapacityRequestDTO {
  readonly warehouseId: string;
  readonly volumeM3: number;
  readonly weightKg: number;
}

export interface WarehouseListFilterDTO {
  readonly status?: WarehouseStatusValue;
  readonly type?: WarehouseTypeValue;
  readonly zone?: string;
  readonly hasCapacity?: boolean;
  readonly search?: string;
}
