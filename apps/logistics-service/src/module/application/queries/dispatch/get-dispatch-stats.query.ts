import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDispatchStatsQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.stats';
  constructor() { super(); }
}
