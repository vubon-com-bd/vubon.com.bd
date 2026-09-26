import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCourierPerformanceQuery extends BaseQuery {
  readonly type = 'logistics.analytics.courier-performance';

  constructor(public readonly courierId?: string) {
    super();
  }
}
