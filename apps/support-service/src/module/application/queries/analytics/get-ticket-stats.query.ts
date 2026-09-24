import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTicketStatsQuery extends BaseQuery {
  readonly type = 'support.analytics.ticket-stats';

  constructor() {
    super();
  }
}
