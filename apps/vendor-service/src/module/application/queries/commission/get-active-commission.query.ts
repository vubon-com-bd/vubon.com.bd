import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetActiveCommissionQuery extends BaseQuery {
  readonly type = 'vendor.commission.get_active';
  constructor(public readonly vendorId: string) { super(); }
}
