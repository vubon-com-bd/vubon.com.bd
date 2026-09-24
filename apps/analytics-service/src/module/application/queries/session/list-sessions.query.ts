import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSessionsQuery extends BaseQuery {
  readonly type = 'analytics.session.list';

  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly limit: number = 100,
  ) {
    super();
  }
}
