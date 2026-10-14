/**
 * GetSettlementQuery
 * @module vendor-service/application/queries/settlement
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetSettlementQuery extends BaseQuery {
  readonly type = 'vendor.settlement.get';
  constructor(public readonly settlementId: string) {
    super();
  }
}
