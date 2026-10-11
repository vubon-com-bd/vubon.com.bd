import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AnalyticsOverviewRequestDTO } from '../../services/interfaces/analytics.service.interface.js';

export class GetAnalyticsOverviewQuery extends BaseQuery {
  readonly type = 'analytics.overview';
  constructor(public readonly options: AnalyticsOverviewRequestDTO) { super(); }
}
