import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListFunnelsQuery extends BaseQuery {
  readonly type = 'analytics.funnel.list';

  constructor(public readonly limit: number = 50) {
    super();
  }
}
