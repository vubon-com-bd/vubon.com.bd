import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProviderConfigServiceInterface } from '../interfaces/provider-config.service.interface';
import type { ProviderConfigRepository } from '../../../domain/repositories/provider-config.repository.interface';
import { ProviderConfigEntity } from '../../../domain/entities/provider-config.entity';
import { ModelProviderIdVO } from '../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderNotFoundError } from '../../errors/provider.errors';

@Injectable()
export class ProviderConfigService
  extends BaseService<ProviderConfigEntity, ModelProviderIdVO>
  implements ProviderConfigServiceInterface
{
  readonly name = 'ProviderConfigService';

  constructor(private readonly configRepo: ProviderConfigRepository) {
    super();
  }

  async findByProviderId(providerId: string): Promise<ProviderConfigEntity | null> {
    return this.configRepo.findByProviderId(ModelProviderIdVO.create(providerId));
  }

  async update(
    providerId: string,
    config: { timeoutMs?: number; maxRetries?: number; enabled?: boolean },
  ): Promise<void> {
    const existing = await this.configRepo.findByProviderId(
      ModelProviderIdVO.create(providerId),
    );
    if (!existing) throw new ProviderNotFoundError(providerId);
    await this.configRepo.save(existing.updateConfig(config));
  }
}
