/**
 * Packaging Response DTOs
 * @module logistics-service/application/dtos/responses/packaging
 */
import type { PackagingTypeValue, PackagingMaterialValue, PackagingStatusValue } from '@vubon/shared-types/logistics';

export interface PackagingResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeValue;
  readonly material: PackagingMaterialValue;
  readonly status: PackagingStatusValue;
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
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PackagingListResponseDTO {
  readonly items: readonly PackagingResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
