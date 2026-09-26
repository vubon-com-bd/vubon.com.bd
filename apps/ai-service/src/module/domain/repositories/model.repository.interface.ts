import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ModelEntity } from '../entities/model.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';
import { ModelNameVO } from '../value-objects/primitives/model-name.vo';
import { ModelProviderIdVO } from '../value-objects/primitives/model-provider-id.vo';

export interface ModelRepository extends BaseRepository<ModelEntity, ModelIdVO> {
  findByName(name: ModelNameVO): Promise<ModelEntity | null>;
  findByProvider(providerId: ModelProviderIdVO): Promise<readonly ModelEntity[]>;
  findDeployed(): Promise<readonly ModelEntity[]>;
  findByStatus(status: string): Promise<readonly ModelEntity[]>;
  findByType(type: string): Promise<readonly ModelEntity[]>;
}
