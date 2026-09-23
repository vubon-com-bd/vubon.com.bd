import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAffiliatesQuery extends BaseQuery {
  readonly type = 'marketing.affiliate.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
