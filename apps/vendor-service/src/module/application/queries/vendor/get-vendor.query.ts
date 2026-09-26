import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVendorQuery extends BaseQuery {
  readonly type = 'vendor.get';

  constructor(public readonly vendorId: string) {
    super();
  }
}
