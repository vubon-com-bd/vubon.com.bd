import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTopVendorsQuery extends BaseQuery {
  readonly type = 'vendor.analytics.top';
  constructor(public readonly limit = 20) {
    super();
  }
}
