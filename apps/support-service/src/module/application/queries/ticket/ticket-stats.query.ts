/**
 * TicketStatsQuery
 * @module support-service/application/queries/ticket
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class TicketStatsQuery extends BaseQuery {
  readonly type = 'support.ticket.stats';

  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
