import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { RouteListOptionsDTO } from '../../services/interfaces/route.service.interface.js';
export class ListRoutesQuery extends BaseQuery {
  readonly type = 'logistics.route.list';
  constructor(public readonly options: RouteListOptionsDTO) { super(); }
}
