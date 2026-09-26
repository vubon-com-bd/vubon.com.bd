import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListLocationsQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.list-locations';

  constructor(
    public readonly warehouseId: string,
    public readonly availableOnly: boolean = false,
  ) {
    super();
  }
}
