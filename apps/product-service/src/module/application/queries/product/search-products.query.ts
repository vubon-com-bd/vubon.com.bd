import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class SearchProductsQuery extends BaseQuery {
  readonly type = 'product.search';

  constructor(
    public readonly term: string,
    public readonly limit: number = 20,
  ) {
    super();
  }
}
