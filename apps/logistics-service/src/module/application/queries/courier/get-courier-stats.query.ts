import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetCourierStatsQuery extends BaseQuery {
  readonly type = 'logistics.courier.stats';
  constructor() { super(); }
}
