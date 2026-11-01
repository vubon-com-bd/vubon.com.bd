import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetPackagingStatsQuery extends BaseQuery {
  readonly type = 'logistics.packaging.stats';
  constructor() { super(); }
}
