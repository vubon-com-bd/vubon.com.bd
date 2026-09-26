/**
 * ListSlaByTicketQuery
 * @module support-service/application/queries/sla
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSlaByTicketQuery extends BaseQuery {
  readonly type = 'support.sla.list_by_ticket';

  constructor(public readonly ticketId: string) {
    super();
  }
}
