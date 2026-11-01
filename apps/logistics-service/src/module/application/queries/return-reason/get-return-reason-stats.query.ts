import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnReasonStatsQuery extends BaseQuery {
  readonly type = 'logistics.return_reason.stats';
  constructor() { super(); }
}
