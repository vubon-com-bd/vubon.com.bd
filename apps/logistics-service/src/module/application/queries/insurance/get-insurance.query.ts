import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetInsuranceQuery extends BaseQuery {
  readonly type = 'logistics.insurance.get';

  constructor(public readonly insuranceId: string) {
    super();
  }
}
