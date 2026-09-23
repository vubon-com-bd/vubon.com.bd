import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListWarehousesQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.list';

  constructor(
    public readonly division?: string,
    public readonly activeOnly: boolean = false,
  ) {
    super();
  }
}
