import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProviderConfigEntity } from '../entities/provider-config.entity';
import { ModelProviderIdVO } from '../value-objects/primitives/model-provider-id.vo';

export interface ProviderConfigRepository
  extends BaseRepository<ProviderConfigEntity, ModelProviderIdVO> {
  findByProviderId(
    providerId: ModelProviderIdVO,
  ): Promise<ProviderConfigEntity | null>;
  findAllEnabled(): Promise<readonly ProviderConfigEntity[]>;
}
