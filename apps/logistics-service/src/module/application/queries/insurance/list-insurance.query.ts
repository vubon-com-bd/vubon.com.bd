import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListInsuranceQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list';

  constructor(public readonly shipmentId?: string) {
    super();
  }
}
