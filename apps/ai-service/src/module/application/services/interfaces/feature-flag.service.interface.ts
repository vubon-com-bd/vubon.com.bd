import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { FeatureFlagEntity } from '../../../domain/entities/feature-flag.entity';
import type { FeatureIdVO } from '../../../domain/value-objects/primitives/feature-id.vo';

export interface FeatureFlagServiceInterface
  extends BaseServiceInterface<FeatureFlagEntity, FeatureIdVO> {
  findByFeatureId(featureId: string): Promise<FeatureFlagEntity | null>;
  setRollout(featureId: string, rolloutPercent: number): Promise<void>;
  addUser(featureId: string, userId: string): Promise<void>;
  removeUser(featureId: string, userId: string): Promise<void>;
}
