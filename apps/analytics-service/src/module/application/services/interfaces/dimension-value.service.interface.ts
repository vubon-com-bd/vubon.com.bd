/**
 * Dimension Value Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { DimensionValueEntity } from '../../../domain/entities/dimension-value.entity.js';

export interface IDimensionValueService extends BaseServiceInterface<DimensionValueEntity, string> {
  findByDimensionAndValue(dimensionId: string, value: string): Promise<DimensionValueEntity | null>;
  findTopByDimension(dimensionId: string, limit: number): Promise<readonly DimensionValueEntity[]>;
  upsertMany(entries: readonly DimensionValueEntity[]): Promise<number>;
}
