import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { CartItemListOptionsDTO } from '../../services/interfaces/cart-item.service.interface.js';

export class ListItemsQuery extends BaseQuery {
  readonly type = 'cart.item.list';

  constructor(public readonly options: CartItemListOptionsDTO) {
    super();
  }
}
