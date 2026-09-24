import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTicketsByAgentQuery extends BaseQuery {
  readonly type = 'support.ticket.list-by-agent';

  constructor(public readonly agentId: string) {
    super();
  }
}
