/**
 * Packaging Request DTOs
 * @module logistics-service/application/dtos/requests/packaging
 */
import type { PackagingTypeValue, PackagingMaterialValue, PackagingStatusValue } from '@vubon/shared-types/logistics';

export interface CreatePackagingRequestDTO {
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeValue;
  readonly material: PackagingMaterialValue;
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
  readonly maxWeightKg: number;
  readonly cost?: number;
  readonly currency?: string;
  readonly imageUrl?: string;
  readonly isFragile: boolean;
  readonly isTemperatureControlled: boolean;
  readonly isRecyclable: boolean;
  readonly stock: number;
  readonly isDefault?: boolean;
}

export interface UpdatePackagingRequestDTO {
  readonly packagingId: string;
  readonly name?: string;
  readonly cost?: number;
}

export interface AdjustPackagingStockRequestDTO {
  readonly packagingId: string;
  readonly delta: number;
  readonly reason: string;
}

export interface RestockPackagingRequestDTO {
  readonly packagingId: string;
  readonly quantity: number;
}

export interface ConsumePackagingRequestDTO {
  readonly packagingId: string;
  readonly quantity: number;
}

export interface SelectPackagingRequestDTO {
  readonly weightKg: number;
  readonly dimensions?: { lengthCm: number; widthCm: number; heightCm: number };
}

export interface PackagingListFilterDTO {
  readonly status?: PackagingStatusValue;
  readonly type?: PackagingTypeValue;
  readonly material?: PackagingMaterialValue;
  readonly isFragile?: boolean;
  readonly inStock?: boolean;
  readonly search?: string;
}
