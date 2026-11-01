import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetZoneStatsQuery extends BaseQuery {
  readonly type = 'logistics.zone.stats';
  constructor() { super(); }
}
