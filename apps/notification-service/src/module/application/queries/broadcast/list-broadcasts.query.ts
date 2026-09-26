import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListBroadcastsQuery extends BaseQuery {
  readonly type = 'broadcast.list';

  constructor(
    public readonly status?: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
