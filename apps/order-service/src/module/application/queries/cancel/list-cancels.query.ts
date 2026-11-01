/**
 * ListCancelsQuery
 * @module order-service/application/queries/cancel
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { CancelListOptionsDTO } from '../../services/interfaces/order-cancel.service.interface.js';

export class ListCancelsQuery extends BaseQuery {
  readonly type = 'order.cancel.list';
  constructor(public readonly options: CancelListOptionsDTO) {
    super();
  }
}
