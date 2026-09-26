import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { FeatureEntity } from '../../../domain/entities/feature.entity';
import type { FeatureIdVO } from '../../../domain/value-objects/primitives/feature-id.vo';

export interface FeatureServiceInterface
  extends BaseServiceInterface<FeatureEntity, FeatureIdVO> {
  findByName(name: string): Promise<FeatureEntity | null>;
  listEnabled(): Promise<readonly FeatureEntity[]>;
  enable(featureId: string): Promise<void>;
  disable(featureId: string): Promise<void>;
  isEnabledForUser(featureId: string, userId: string): Promise<boolean>;
}
