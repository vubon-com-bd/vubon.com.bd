import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTopVendorsQuery extends BaseQuery {
  readonly type = 'vendor.analytics.top-vendors';

  constructor(public readonly limit: number = 10) {
    super();
  }
}
