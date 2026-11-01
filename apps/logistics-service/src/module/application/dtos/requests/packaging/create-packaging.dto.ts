import type { PackagingTypeValue } from '@domain/primitives/packaging-type.vo';
import type { PackagingMaterialValue } from '@domain/primitives/packaging-material.vo';

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
