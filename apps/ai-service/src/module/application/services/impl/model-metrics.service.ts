import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ModelMetricsServiceInterface } from '../interfaces/model-metrics.service.interface';
import type { ModelMetricsRepository } from '../../../domain/repositories/model-metrics.repository.interface';
import { ModelMetricsEntity } from '../../../domain/entities/model-metrics.entity';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import { ModelMetricsVO } from '../../../domain/value-objects/composites/model-metrics.vo';

@Injectable()
export class ModelMetricsService
  extends BaseService<ModelMetricsEntity, ModelIdVO>
  implements ModelMetricsServiceInterface
{
  readonly name = 'ModelMetricsService';

  constructor(private readonly metricsRepo: ModelMetricsRepository) {
    super();
  }

  async findByModelId(modelId: string): Promise<readonly ModelMetricsEntity[]> {
    return this.metricsRepo.findByModelId(ModelIdVO.create(modelId));
  }

  async findLatest(modelId: string): Promise<ModelMetricsEntity | null> {
    return this.metricsRepo.findLatestByModel(ModelIdVO.create(modelId));
  }

  async record(modelId: string, metrics: Readonly<Record<string, number | null>>): Promise<void> {
    const id = ModelIdVO.create(modelId);
    const vo = ModelMetricsVO.create({
      accuracy: metrics.accuracy ?? null,
      precision: metrics.precision ?? null,
      recall: metrics.recall ?? null,
      f1Score: metrics.f1Score ?? null,
      latencyMs: metrics.latencyMs ?? null,
    });
    const entity = ModelMetricsEntity.create({ modelId: id, metrics: vo });
    await this.metricsRepo.save(entity);
  }
}
