import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCourierPerformanceQuery } from './get-courier-performance.query';

export interface CourierPerformanceView {
  readonly courierId: string;
  readonly onTimeRate: number;
  readonly deliveryRate: number;
}

@QueryHandler(GetCourierPerformanceQuery)
export class GetCourierPerformanceHandler
  extends BaseQueryHandler<GetCourierPerformanceQuery, readonly CourierPerformanceView[]>
  implements IQueryHandler<GetCourierPerformanceQuery>
{
  readonly queryType = 'logistics.analytics.courier-performance';

  async execute(_query: GetCourierPerformanceQuery): Promise<readonly CourierPerformanceView[]> {
    return [];
  }
}
