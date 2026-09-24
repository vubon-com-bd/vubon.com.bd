import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTicketsByStatusQuery extends BaseQuery {
  readonly type = 'support.ticket.list-by-status';

  constructor(public readonly status: string) {
    super();
  }
}
