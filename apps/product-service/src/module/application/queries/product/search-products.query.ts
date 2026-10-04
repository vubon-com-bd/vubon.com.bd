import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class SearchProductsQuery extends BaseQuery {
  readonly type = 'product.search';
  constructor(
    public readonly search: string,
    public readonly page: number,
    public readonly limit: number,
  ) { super(); }
}
