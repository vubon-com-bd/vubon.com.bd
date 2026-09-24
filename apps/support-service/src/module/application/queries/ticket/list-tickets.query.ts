import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTicketsQuery extends BaseQuery {
  readonly type = 'support.ticket.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly status?: string,
    public readonly priority?: string,
  ) {
    super();
  }
}
