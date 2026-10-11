import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AnalyticsTimeSeriesRequestDTO } from '../../services/interfaces/analytics.service.interface.js';

export class GetAnalyticsTimeSeriesQuery extends BaseQuery {
  readonly type = 'analytics.time_series';
  constructor(public readonly options: AnalyticsTimeSeriesRequestDTO) { super(); }
}
