import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListLeadsQuery extends BaseQuery {
  readonly type = 'marketing.lead.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
    public readonly status?: string,
  ) {
    super();
  }
}
