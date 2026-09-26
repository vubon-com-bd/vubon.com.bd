import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FeatureEntity } from '../entities/feature.entity';
import { FeatureIdVO } from '../value-objects/primitives/feature-id.vo';
import { FeatureNameVO } from '../value-objects/primitives/feature-name.vo';

export interface FeatureRepository
  extends BaseRepository<FeatureEntity, FeatureIdVO> {
  findByName(name: FeatureNameVO): Promise<FeatureEntity | null>;
  findAllEnabled(): Promise<readonly FeatureEntity[]>;
  findAllDisabled(): Promise<readonly FeatureEntity[]>;
  findByStatus(status: string): Promise<readonly FeatureEntity[]>;
}
