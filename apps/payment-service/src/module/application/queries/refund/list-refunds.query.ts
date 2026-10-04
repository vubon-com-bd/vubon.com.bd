import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { RefundListOptionsDTO } from '../../services/interfaces/refund.service.interface.js';

export class ListRefundsQuery extends BaseQuery {
  readonly type = 'refund.list';
  constructor(public readonly options: RefundListOptionsDTO) {
    super();
  }
}
