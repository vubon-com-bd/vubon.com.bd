import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProviderEntity } from '../../../domain/entities/provider.entity';
import type { ModelProviderIdVO } from '../../../domain/value-objects/primitives/model-provider-id.vo';

export interface ProviderServiceInterface
  extends BaseServiceInterface<ProviderEntity, ModelProviderIdVO> {
  findByName(name: string): Promise<ProviderEntity | null>;
  listAvailable(): Promise<readonly ProviderEntity[]>;
  activate(providerId: string): Promise<void>;
  deactivate(providerId: string): Promise<void>;
}
