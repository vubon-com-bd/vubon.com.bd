import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class SearchEventsQuery extends BaseQuery {
  readonly type = 'analytics.event.search';

  constructor(
    public readonly name: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
