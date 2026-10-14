import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { SettlementListOptionsDTO } from '../../services/interfaces/vendor-settlement.service.interface.js';

export class ListSettlementsQuery extends BaseQuery {
  readonly type = 'vendor.settlement.list';
  constructor(public readonly options: SettlementListOptionsDTO) {
    super();
  }
}
