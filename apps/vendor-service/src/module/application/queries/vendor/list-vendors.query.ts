import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export interface ListVendorsFilter {
  readonly status?: string;
  readonly type?: string;
  readonly tier?: string;
  readonly search?: string;
}

export class ListVendorsQuery extends BaseQuery {
  readonly type = 'vendor.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly filter?: ListVendorsFilter,
  ) {
    super();
  }
}
