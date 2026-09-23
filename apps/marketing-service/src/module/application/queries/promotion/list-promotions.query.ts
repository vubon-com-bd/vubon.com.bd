import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPromotionsQuery extends BaseQuery {
  readonly type = 'marketing.promotion.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
