import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListAvailableVehiclesQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.list_available';
  constructor() { super(); }
}
