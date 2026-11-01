import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AbandonedCartListFilterDTO } from '../../services/interfaces/abandoned-cart.service.interface.js';

export class GetAbandonedStatsQuery extends BaseQuery {
  readonly type = 'cart.abandoned.stats';

  constructor(public readonly filter?: AbandonedCartListFilterDTO) {
    super();
  }
}
