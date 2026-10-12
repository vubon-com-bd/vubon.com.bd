import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { CourierListOptionsDTO } from '../../services/interfaces/courier.service.interface.js';
export class ListCouriersQuery extends BaseQuery {
  readonly type = 'logistics.courier.list';
  constructor(public readonly options: CourierListOptionsDTO) { super(); }
}
