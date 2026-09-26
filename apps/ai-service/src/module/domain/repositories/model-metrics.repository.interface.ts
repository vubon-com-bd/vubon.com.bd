import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ModelMetricsEntity } from '../entities/model-metrics.entity';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';

export interface ModelMetricsRepository
  extends BaseRepository<ModelMetricsEntity, ModelIdVO> {
  findByModelId(modelId: ModelIdVO): Promise<readonly ModelMetricsEntity[]>;
  findLatestByModel(modelId: ModelIdVO): Promise<ModelMetricsEntity | null>;
  findProductionReady(): Promise<readonly ModelMetricsEntity[]>;
}
