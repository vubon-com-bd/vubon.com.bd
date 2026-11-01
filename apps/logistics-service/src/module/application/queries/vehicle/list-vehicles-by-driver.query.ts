import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListVehiclesByDriverQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.list_by_driver';
  constructor(public readonly driverId: string) { super(); }
}
