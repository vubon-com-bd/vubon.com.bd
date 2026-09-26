import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProviderServiceInterface } from '../interfaces/provider.service.interface';
import type { ProviderRepository } from '../../../domain/repositories/provider.repository.interface';
import { ProviderEntity } from '../../../domain/entities/provider.entity';
import { ModelProviderIdVO } from '../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderNameVO } from '../../../domain/value-objects/primitives/provider-name.vo';
import { ProviderNotFoundError } from '../../errors/provider.errors';

@Injectable()
export class ProviderService
  extends BaseService<ProviderEntity, ModelProviderIdVO>
  implements ProviderServiceInterface
{
  readonly name = 'ProviderService';

  constructor(private readonly providerRepo: ProviderRepository) {
    super();
  }

  async findByName(name: string): Promise<ProviderEntity | null> {
    return this.providerRepo.findByName(ProviderNameVO.create(name));
  }

  async listAvailable(): Promise<readonly ProviderEntity[]> {
    return this.providerRepo.findAvailable();
  }

  async activate(providerId: string): Promise<void> {
    const entity = await this.providerRepo.findById(ModelProviderIdVO.create(providerId));
    if (!entity) throw new ProviderNotFoundError(providerId);
    const activated = ProviderEntity.reconstitute(
      entity.id,
      { name: entity.name, status: 'active', config: entity.config },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );
    await this.providerRepo.save(activated);
  }

  async deactivate(providerId: string): Promise<void> {
    const entity = await this.providerRepo.findById(ModelProviderIdVO.create(providerId));
    if (!entity) throw new ProviderNotFoundError(providerId);
    const deactivated = ProviderEntity.reconstitute(
      entity.id,
      { name: entity.name, status: 'inactive', config: entity.config },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );
    await this.providerRepo.save(deactivated);
  }
}
