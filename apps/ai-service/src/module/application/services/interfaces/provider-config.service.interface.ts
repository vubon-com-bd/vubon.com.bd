import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProviderConfigEntity } from '../../../domain/entities/provider-config.entity';
import type { ModelProviderIdVO } from '../../../domain/value-objects/primitives/model-provider-id.vo';

export interface ProviderConfigServiceInterface
  extends BaseServiceInterface<ProviderConfigEntity, ModelProviderIdVO> {
  findByProviderId(providerId: string): Promise<ProviderConfigEntity | null>;
  update(
    providerId: string,
    config: { timeoutMs?: number; maxRetries?: number; enabled?: boolean },
  ): Promise<void>;
}
