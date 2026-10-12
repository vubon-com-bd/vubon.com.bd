import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListEventsQuery extends BaseQuery {
  readonly type = 'analytics.event.list';
  constructor(
    public readonly sessionId: string | undefined,
    public readonly userId: string | undefined,
    public readonly limit: number = 100
  ) { super(); }
}
