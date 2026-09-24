import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListMessagesByTicketQuery extends BaseQuery {
  readonly type = 'support.message.list-by-ticket';

  constructor(public readonly ticketId: string) {
    super();
  }
}
