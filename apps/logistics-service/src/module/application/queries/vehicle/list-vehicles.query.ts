import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { VehicleListOptionsDTO } from '../../services/interfaces/vehicle.service.interface.js';
export class ListVehiclesQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.list';
  constructor(public readonly options: VehicleListOptionsDTO) { super(); }
}
