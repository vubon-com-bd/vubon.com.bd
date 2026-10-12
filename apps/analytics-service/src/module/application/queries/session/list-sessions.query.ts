import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListSessionsQuery extends BaseQuery {
  readonly type = 'analytics.session.list';
  constructor(public readonly userId: string) { super(); }
}
