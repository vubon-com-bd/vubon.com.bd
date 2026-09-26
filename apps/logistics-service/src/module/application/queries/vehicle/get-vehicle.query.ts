import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVehicleQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.get';

  constructor(public readonly vehicleId: string) {
    super();
  }
}
