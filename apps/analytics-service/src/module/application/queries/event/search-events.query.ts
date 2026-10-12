import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class SearchEventsQuery extends BaseQuery {
  readonly type = 'analytics.event.search';
  constructor(
    public readonly query: string,
    public readonly limit: number = 50
  ) { super(); }
}
