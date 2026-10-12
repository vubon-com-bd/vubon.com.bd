import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class FindTopRatedVendorsQuery extends BaseQuery {
  readonly type = 'vendor.find_top_rated';
  constructor(public readonly limit: number = 10) { super(); }
}
