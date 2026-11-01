import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetMyVendorQuery extends BaseQuery {
  readonly type = 'vendor.vendor.get_mine';
  constructor(public readonly userId: string) {
    super();
  }
}
