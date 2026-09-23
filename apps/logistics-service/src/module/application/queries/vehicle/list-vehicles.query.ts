import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListVehiclesQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.list';

  constructor(public readonly availableOnly: boolean = false) {
    super();
  }
}
