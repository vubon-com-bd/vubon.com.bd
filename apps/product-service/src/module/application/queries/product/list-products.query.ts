import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export interface ListProductsFilter {
  readonly status?: string;
  readonly vendorId?: string;
  readonly categoryId?: string;
  readonly brandId?: string;
}

export class ListProductsQuery extends BaseQuery {
  readonly type = 'product.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly filter?: ListProductsFilter,
  ) {
    super();
  }
}
