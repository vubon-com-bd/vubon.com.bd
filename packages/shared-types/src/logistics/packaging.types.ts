/**
 * Packaging Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/packaging.constants থেকে।
 */

import type {
  PACKAGING_TYPE,
  PACKAGING_MATERIAL,
  PACKAGING_STATUS,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { Url } from '../common/primitives';

export type PackagingTypeValue = (typeof PACKAGING_TYPE)[keyof typeof PACKAGING_TYPE];

export type PackagingMaterialValue = (typeof PACKAGING_MATERIAL)[keyof typeof PACKAGING_MATERIAL];

export type PackagingStatusValue = (typeof PACKAGING_STATUS)[keyof typeof PACKAGING_STATUS];

export interface Packaging extends BaseEntity<string> {
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
  readonly imageUrl?: Url;
  readonly isFragile: boolean;
  readonly isTemperatureControlled: boolean;
  readonly isRecyclable: boolean;
  readonly stock: number;
  readonly isDefault: boolean;
}

export interface PackagingPublic {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeValue;
  readonly material: PackagingMaterialValue;
  readonly dimensions: string;
  readonly maxWeightKg: number;
}
