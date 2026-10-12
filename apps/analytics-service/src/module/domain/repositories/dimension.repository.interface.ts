/**
 * Dimension Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { DimensionEntity } from '../entities/dimension.entity.js';
import type { DimensionNameVO } from '../value-objects/primitives/dimension-name.vo.js';

export interface DimensionRepository extends BaseRepository<DimensionEntity, string> {
  findByName(name: DimensionNameVO): Promise<DimensionEntity | null>;
  findAllActive(): Promise<readonly DimensionEntity[]>;
  findByCustom(isCustom: boolean): Promise<readonly DimensionEntity[]>;
  existsByName(name: DimensionNameVO): Promise<boolean>;
}
