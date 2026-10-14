import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PayoutListOptionsDTO } from '../../services/interfaces/vendor-payout.service.interface.js';

export class ListPayoutsQuery extends BaseQuery {
  readonly type = 'vendor.payout.list';
  constructor(public readonly options: PayoutListOptionsDTO) {
    super();
  }
}
