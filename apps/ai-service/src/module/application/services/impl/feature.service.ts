import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { FeatureServiceInterface } from '../interfaces/feature.service.interface';
import type { FeatureRepository } from '../../../domain/repositories/feature.repository.interface';
import { FeatureEntity } from '../../../domain/entities/feature.entity';
import { FeatureIdVO } from '../../../domain/value-objects/primitives/feature-id.vo';
import { FeatureNameVO } from '../../../domain/value-objects/primitives/feature-name.vo';

@Injectable()
export class FeatureService
  extends BaseService<FeatureEntity, FeatureIdVO>
  implements FeatureServiceInterface
{
  readonly name = 'FeatureService';

  constructor(private readonly featureRepo: FeatureRepository) {
    super();
  }

  async findByName(name: string): Promise<FeatureEntity | null> {
    return this.featureRepo.findByName(FeatureNameVO.create(name));
  }

  async listEnabled(): Promise<readonly FeatureEntity[]> {
    return this.featureRepo.findAllEnabled();
  }

  async enable(featureId: string): Promise<void> {
    const entity = await this.featureRepo.findById(FeatureIdVO.create(featureId));
    if (!entity) return;
    await this.featureRepo.save(
      FeatureEntity.reconstitute(
        entity.id,
        { name: entity.name, status: entity.status, flag: entity.flag },
        entity.createdAt,
        new Date().toISOString(),
        entity.deletedAt ?? null,
      ),
    );
  }

  async disable(featureId: string): Promise<void> {
    const entity = await this.featureRepo.findById(FeatureIdVO.create(featureId));
    if (!entity) return;
    await this.featureRepo.save(
      FeatureEntity.reconstitute(
        entity.id,
        { name: entity.name, status: entity.status, flag: entity.flag },
        entity.createdAt,
        new Date().toISOString(),
        entity.deletedAt ?? null,
      ),
    );
  }

  async isEnabledForUser(featureId: string, userId: string): Promise<boolean> {
    const entity = await this.featureRepo.findById(FeatureIdVO.create(featureId));
    return entity?.isEnabledFor(userId) ?? false;
  }
}
