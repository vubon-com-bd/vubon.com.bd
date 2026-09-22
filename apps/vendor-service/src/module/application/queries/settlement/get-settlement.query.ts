import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSettlementQuery extends BaseQuery {
  readonly type = 'vendor.settlement.get';

  constructor(public readonly settlementId: string) {
    super();
  }
}
