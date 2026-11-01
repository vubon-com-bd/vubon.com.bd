import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetVehicleStatsQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.stats';
  constructor() { super(); }
}
