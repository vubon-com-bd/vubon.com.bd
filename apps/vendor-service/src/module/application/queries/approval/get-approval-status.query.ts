import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetApprovalStatusQuery extends BaseQuery {
  readonly type = 'vendor.approval.status';
  constructor(public readonly vendorId: string) {
    super();
  }
}
