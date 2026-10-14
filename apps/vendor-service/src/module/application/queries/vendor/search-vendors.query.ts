import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class SearchVendorsQuery extends BaseQuery {
  readonly type = 'vendor.vendor.search';
  constructor(
    public readonly term: string,
    public readonly limit = 20,
  ) {
    super();
  }
}
