import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCommissionQuery extends BaseQuery {
  readonly type = 'vendor.commission.get';

  constructor(public readonly commissionId: string) {
    super();
  }
}
