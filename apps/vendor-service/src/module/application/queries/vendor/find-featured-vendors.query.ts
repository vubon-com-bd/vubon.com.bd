import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class FindFeaturedVendorsQuery extends BaseQuery {
  readonly type = 'vendor.find_featured';
  constructor(public readonly limit: number = 10) { super(); }
}
