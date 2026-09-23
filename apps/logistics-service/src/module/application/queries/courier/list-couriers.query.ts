import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCouriersQuery extends BaseQuery {
  readonly type = 'logistics.courier.list';

  constructor(public readonly activeOnly: boolean = false) {
    super();
  }
}
