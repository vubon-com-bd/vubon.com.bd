import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { FeatureFlagServiceInterface } from '../interfaces/feature-flag.service.interface';
import type { FeatureFlagRepository } from '../../../domain/repositories/feature-flag.repository.interface';
import { FeatureFlagEntity } from '../../../domain/entities/feature-flag.entity';
import { FeatureIdVO } from '../../../domain/value-objects/primitives/feature-id.vo';

@Injectable()
export class FeatureFlagService
  extends BaseService<FeatureFlagEntity, FeatureIdVO>
  implements FeatureFlagServiceInterface
{
  readonly name = 'FeatureFlagService';

  constructor(private readonly flagRepo: FeatureFlagRepository) {
    super();
  }

  async findByFeatureId(featureId: string): Promise<FeatureFlagEntity | null> {
    return this.flagRepo.findByFeatureId(FeatureIdVO.create(featureId));
  }

  async setRollout(featureId: string, rolloutPercent: number): Promise<void> {
    const entity = await this.flagRepo.findByFeatureId(FeatureIdVO.create(featureId));
    if (!entity) return;
    await this.flagRepo.save(entity.setRollout(rolloutPercent));
  }

  async addUser(featureId: string, userId: string): Promise<void> {
    const entity = await this.flagRepo.findByFeatureId(FeatureIdVO.create(featureId));
    if (!entity) return;
    await this.flagRepo.save(entity.addUser(userId));
  }

  async removeUser(featureId: string, userId: string): Promise<void> {
    const entity = await this.flagRepo.findByFeatureId(FeatureIdVO.create(featureId));
    if (!entity) return;
    await this.flagRepo.save(entity.removeUser(userId));
  }
}
