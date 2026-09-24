import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTicketQuery extends BaseQuery {
  readonly type = 'support.ticket.get';

  constructor(public readonly ticketId: string) {
    super();
  }
}
