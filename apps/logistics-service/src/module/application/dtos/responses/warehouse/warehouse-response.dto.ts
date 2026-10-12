/**
 * Warehouse Response DTOs
 * @module logistics-service/application/dtos/responses/warehouse
 */
import type { Address } from '@vubon/shared-types/common';
import type { WarehouseTypeValue, WarehouseStatusValue } from '@vubon/shared-types/logistics';

export interface WarehouseResponseDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: WarehouseTypeValue;
  readonly status: WarehouseStatusValue;
  readonly address: Address;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly managerId?: string;
  readonly capacityM3: number;
  readonly usedCapacityM3: number;
  readonly availableM3: number;
  readonly capacityKg: number;
  readonly usedCapacityKg: number;
  readonly availableKg: number;
  readonly utilizationPercent: number;
  readonly maxSkus: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface WarehouseListResponseDTO {
  readonly items: readonly WarehouseResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
