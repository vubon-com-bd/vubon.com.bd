import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListCommissionsQuery extends BaseQuery {
  readonly type = 'vendor.commission.list';
  constructor(public readonly vendorId: string) {
    super();
  }
}
