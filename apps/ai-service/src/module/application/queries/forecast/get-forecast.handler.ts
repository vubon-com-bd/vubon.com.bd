import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetForecastQuery } from './get-forecast.query';
import type { ForecastRepository } from '../../../domain/repositories/forecast.repository.interface';
import { ForecastIdVO } from '../../../domain/value-objects/primitives/forecast-id.vo';
import type { ForecastResponseDTO } from '../../dtos/responses/forecast-response.dto';

@QueryHandler(GetForecastQuery)
export class GetForecastHandler
  extends BaseQueryHandler<GetForecastQuery, ForecastResponseDTO | null>
  implements IQueryHandler<GetForecastQuery>
{
  readonly queryType = 'ai.forecast.get';
  constructor(private readonly forecastRepo: ForecastRepository) { super(); }

  async execute(query: GetForecastQuery): Promise<ForecastResponseDTO | null> {
    const entity = await this.forecastRepo.findById(ForecastIdVO.create(query.forecastId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      target: entity.target,
      model: entity.model,
      horizonDays: entity.horizon.value,
      points: entity.result.points.map((p) => ({
        timestamp: p.timestamp.toISOString(),
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })),
      generatedAt: entity.createdAt,
    };
  }
}
