import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProviderEntity } from '../entities/provider.entity';
import { ModelProviderIdVO } from '../value-objects/primitives/model-provider-id.vo';
import { ProviderNameVO } from '../value-objects/primitives/provider-name.vo';

export interface ProviderRepository
  extends BaseRepository<ProviderEntity, ModelProviderIdVO> {
  findByName(name: ProviderNameVO): Promise<ProviderEntity | null>;
  findAllActive(): Promise<readonly ProviderEntity[]>;
  findAvailable(): Promise<readonly ProviderEntity[]>;
}
