import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDriverStatsQuery extends BaseQuery {
  readonly type = 'logistics.driver.stats';
  constructor() { super(); }
}
