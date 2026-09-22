import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListOrdersQuery extends BaseQuery {
  readonly type = 'order.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) {
    super();
  }
}
