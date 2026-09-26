import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DimensionValueEntity } from '../entities/dimension-value.entity';
import { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo';

export interface DimensionValueRepository
  extends BaseRepository<DimensionValueEntity, string> {
  findByDimensionId(dimensionId: DimensionIdVO): Promise<readonly DimensionValueEntity[]>;
  findTopByFrequency(
    dimensionId: DimensionIdVO,
    limit: number,
  ): Promise<readonly DimensionValueEntity[]>;
}
