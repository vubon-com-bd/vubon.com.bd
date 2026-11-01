import type { PackagingTypeValue } from '@domain/primitives/packaging-type.vo';
import type { PackagingMaterialValue } from '@domain/primitives/packaging-material.vo';
import type { PackagingStatusValue } from '@domain/primitives/packaging-status.vo';

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
  readonly volumeM3?: number;
  readonly cost?: number;
  readonly currency?: string;
  readonly imageUrl?: string;
  readonly isFragile: boolean;
  readonly isTemperatureControlled: boolean;
  readonly isRecyclable: boolean;
  readonly stock: number;
  readonly isDefault: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly discontinuedAt?: string;
  readonly deactivateReason?: string;
  readonly discontinueReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
