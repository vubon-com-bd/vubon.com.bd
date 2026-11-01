import type { PackagingTypeValue } from '@domain/primitives/packaging-type.vo';
import type { PackagingStatusValue } from '@domain/primitives/packaging-status.vo';

export interface PackagingSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeValue;
  readonly status: PackagingStatusValue;
  readonly dimensions: string;
  readonly maxWeightKg: number;
  readonly stock: number;
  readonly createdAt: string;
}
