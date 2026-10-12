/**
 * Dimension Value Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { DimensionValueEntity } from '../entities/dimension-value.entity.js';
import type { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo.js';
import type { DimensionValueVO } from '../value-objects/primitives/dimension-value.vo.js';

export interface DimensionValueRepository extends BaseRepository<DimensionValueEntity, string> {
  findByDimensionAndValue(
    dimensionId: DimensionIdVO,
    value: DimensionValueVO
  ): Promise<DimensionValueEntity | null>;
  findTopByDimension(
    dimensionId: DimensionIdVO,
    limit: number
  ): Promise<readonly DimensionValueEntity[]>;
  findByDimension(dimensionId: DimensionIdVO): Promise<readonly DimensionValueEntity[]>;
  upsertMany(values: readonly DimensionValueEntity[]): Promise<number>;
  deleteByDimension(dimensionId: DimensionIdVO): Promise<number>;
}
