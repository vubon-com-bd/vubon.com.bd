import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListReturnsQuery extends BaseQuery {
  readonly type = 'logistics.return-shipment.list';

  constructor(public readonly status?: string) {
    super();
  }
}
