import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetWarrantyQuery extends BaseQuery {
  readonly type = 'vendor.warranty.get';
  constructor(public readonly vendorId: string) {
    super();
  }
}
