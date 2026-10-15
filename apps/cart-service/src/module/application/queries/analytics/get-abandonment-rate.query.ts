import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AbandonedCartListFilterDTO } from '../../services/interfaces/abandoned-cart.service.interface.js';

export class GetAbandonmentRateQuery extends BaseQuery {
  readonly type = 'cart.analytics.abandonment_rate';

  constructor(public readonly filter?: AbandonedCartListFilterDTO) {
    super();
  }
}
