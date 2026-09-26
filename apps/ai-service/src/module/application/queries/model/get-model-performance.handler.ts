import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetModelPerformanceQuery } from './get-model-performance.query';
import type { ModelMetricsRepository } from '../../../domain/repositories/model-metrics.repository.interface';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import type { ModelPerformanceResponseDTO } from '../../dtos/responses/model-performance-response.dto';

@QueryHandler(GetModelPerformanceQuery)
export class GetModelPerformanceHandler
  extends BaseQueryHandler<GetModelPerformanceQuery, ModelPerformanceResponseDTO | null>
  implements IQueryHandler<GetModelPerformanceQuery>
{
  readonly queryType = 'ai.model.get-performance';
  constructor(private readonly metricsRepo: ModelMetricsRepository) { super(); }

  async execute(query: GetModelPerformanceQuery): Promise<ModelPerformanceResponseDTO | null> {
    const latest = await this.metricsRepo.findLatestByModel(ModelIdVO.create(query.modelId));
    if (!latest) return null;
    return {
      modelId: query.modelId,
      accuracy: latest.metrics.accuracy,
      precision: latest.metrics.precision,
      recall: latest.metrics.recall,
      f1Score: latest.metrics.f1Score,
      latencyMs: latest.metrics.latencyMs,
      sampleCount: 0,
      recordedAt: latest.createdAt,
    };
  }
}
