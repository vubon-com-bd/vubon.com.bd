/**
 * ListTicketsQuery
 * @module support-service/application/queries/ticket
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTicketsQuery extends BaseQuery {
  readonly type = 'support.ticket.list';

  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
