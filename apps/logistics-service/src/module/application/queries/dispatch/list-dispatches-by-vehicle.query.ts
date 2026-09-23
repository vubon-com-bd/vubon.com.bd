import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDispatchesByVehicleQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list-by-vehicle';

  constructor(public readonly vehicleId: string) {
    super();
  }
}
