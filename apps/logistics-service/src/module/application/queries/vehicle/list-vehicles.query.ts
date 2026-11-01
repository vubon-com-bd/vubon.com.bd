import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { VehicleListOptionsDTO } from '@application/services/interfaces/vehicle.service.interface';
export class ListVehiclesQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.list';
  constructor(public readonly options: VehicleListOptionsDTO) { super(); }
}
