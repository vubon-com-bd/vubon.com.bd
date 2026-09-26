import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FeatureFlagEntity } from '../entities/feature-flag.entity';
import { FeatureIdVO } from '../value-objects/primitives/feature-id.vo';

export interface FeatureFlagRepository
  extends BaseRepository<FeatureFlagEntity, FeatureIdVO> {
  findByFeatureId(featureId: FeatureIdVO): Promise<FeatureFlagEntity | null>;
  findEnabledForUser(userId: string): Promise<readonly FeatureFlagEntity[]>;
}
