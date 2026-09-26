/**
 * SearchTicketsQuery
 * @module support-service/application/queries/ticket
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class SearchTicketsQuery extends BaseQuery {
  readonly type = 'support.ticket.search';

  constructor(
    public readonly keyword: string,
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
