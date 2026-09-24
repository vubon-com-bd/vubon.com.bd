import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { TimeSeriesQuery } from './time-series.query';
import type { MetricRepository } from '../../../domain/repositories/metric.repository.interface';
import { MetricNameVO } from '../../../domain/value-objects/primitives/metric-name.vo';
import {
  type TimeSeriesResponseDTO,
  toTimeSeriesResponse,
} from '../../dtos/responses';

@QueryHandler(TimeSeriesQuery)
export class TimeSeriesHandler
  extends BaseQueryHandler<TimeSeriesQuery, TimeSeriesResponseDTO>
  implements IQueryHandler<TimeSeriesQuery>
{
  readonly queryType = 'analytics.metric.time-series';

  constructor(private readonly metricRepo: MetricRepository) {
    super();
  }

  async execute(query: TimeSeriesQuery): Promise<TimeSeriesResponseDTO> {
    const entities = await this.metricRepo.findByName(
      MetricNameVO.create(query.metricName),
    );
    const points = entities.map((e) => ({
      bucketMs: e.window?.startMs ?? new Date(e.createdAt).getTime(),
      value: e.value.numeric,
    }));
    return toTimeSeriesResponse(query.metricName, query.interval, points);
  }
}
