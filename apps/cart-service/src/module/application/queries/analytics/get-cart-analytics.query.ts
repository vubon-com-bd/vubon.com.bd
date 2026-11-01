import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { CartListFilterDTO } from '../../services/interfaces/cart.service.interface.js';

export class GetCartAnalyticsQuery extends BaseQuery {
  readonly type = 'cart.analytics.get';

  constructor(public readonly filter?: CartListFilterDTO) {
    super();
  }
}
