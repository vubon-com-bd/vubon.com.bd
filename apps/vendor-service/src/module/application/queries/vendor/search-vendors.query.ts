import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class SearchVendorsQuery extends BaseQuery {
  readonly type = 'vendor.search';

  constructor(
    public readonly keyword: string,
    public readonly limit: number = 20,
  ) {
    super();
  }
}
