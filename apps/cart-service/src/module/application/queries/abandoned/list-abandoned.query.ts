import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AbandonedCartListOptionsDTO } from '../../services/interfaces/abandoned-cart.service.interface.js';

export class ListAbandonedQuery extends BaseQuery {
  readonly type = 'cart.abandoned.list';

  constructor(public readonly options: AbandonedCartListOptionsDTO) {
    super();
  }
}
