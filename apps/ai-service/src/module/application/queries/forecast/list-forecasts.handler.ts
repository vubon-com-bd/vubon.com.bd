import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListForecastsQuery } from './list-forecasts.query';
import type { ForecastRepository } from '../../../domain/repositories/forecast.repository.interface';
import type { ForecastResponseDTO } from '../../dtos/responses/forecast-response.dto';

@QueryHandler(ListForecastsQuery)
export class ListForecastsHandler
  extends BaseQueryHandler<ListForecastsQuery, readonly ForecastResponseDTO[]>
  implements IQueryHandler<ListForecastsQuery>
{
  readonly queryType = 'ai.forecast.list';
  constructor(private readonly forecastRepo: ForecastRepository) { super(); }

  async execute(query: ListForecastsQuery): Promise<readonly ForecastResponseDTO[]> {
    const entities = await this.forecastRepo.findRecentByTarget(query.target, query.limit);
    return entities.map((e) => ({
      id: e.id.value,
      target: e.target,
      model: e.model,
      horizonDays: e.horizon.value,
      points: e.result.points.map((p) => ({
        timestamp: p.timestamp.toISOString(),
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })),
      generatedAt: e.createdAt,
    }));
  }
}
