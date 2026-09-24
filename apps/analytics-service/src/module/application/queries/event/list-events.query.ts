import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListEventsQuery extends BaseQuery {
  readonly type = 'analytics.event.list';

  constructor(
    public readonly limit: number = 50,
    public readonly offset: number = 0,
    public readonly source?: string,
  ) {
    super();
  }
}
