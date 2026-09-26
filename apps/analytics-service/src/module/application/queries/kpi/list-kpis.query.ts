import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListKpisQuery extends BaseQuery {
  readonly type = 'analytics.kpi.list';

  constructor(
    public readonly limit: number = 50,
    public readonly offset: number = 0,
  ) {
    super();
  }
}
