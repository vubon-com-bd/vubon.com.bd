import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ModelMetricsEntity } from '../../../domain/entities/model-metrics.entity';
import type { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';

export interface ModelMetricsServiceInterface
  extends BaseServiceInterface<ModelMetricsEntity, ModelIdVO> {
  findByModelId(modelId: string): Promise<readonly ModelMetricsEntity[]>;
  findLatest(modelId: string): Promise<ModelMetricsEntity | null>;
  record(modelId: string, metrics: Readonly<Record<string, number | null>>): Promise<void>;
}
