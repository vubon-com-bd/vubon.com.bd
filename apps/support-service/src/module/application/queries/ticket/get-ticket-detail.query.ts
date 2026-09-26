/**
 * GetTicketDetailQuery
 * @module support-service/application/queries/ticket
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTicketDetailQuery extends BaseQuery {
  readonly type = 'support.ticket.get_detail';

  constructor(public readonly ticketId: string) {
    super();
  }
}
