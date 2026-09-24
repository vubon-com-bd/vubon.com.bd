import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DimensionEntity } from '../entities/dimension.entity';
import { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo';
import { DimensionNameVO } from '../value-objects/primitives/dimension-name.vo';

export interface DimensionRepository
  extends BaseRepository<DimensionEntity, DimensionIdVO> {
  findByName(name: DimensionNameVO): Promise<DimensionEntity | null>;
}
