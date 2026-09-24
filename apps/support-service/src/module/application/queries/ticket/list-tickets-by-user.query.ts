import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTicketsByUserQuery extends BaseQuery {
  readonly type = 'support.ticket.list-by-user';

  constructor(public readonly userId: string) {
    super();
  }
}
