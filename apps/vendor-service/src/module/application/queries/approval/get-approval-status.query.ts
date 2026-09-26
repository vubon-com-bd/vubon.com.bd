import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetApprovalStatusQuery extends BaseQuery {
  readonly type = 'vendor.approval.get-status';

  constructor(public readonly vendorId: string) {
    super();
  }
}
