import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { RouteListOptionsDTO } from '@application/services/interfaces/route.service.interface';
export class ListRoutesQuery extends BaseQuery {
  readonly type = 'logistics.route.list';
  constructor(public readonly options: RouteListOptionsDTO) { super(); }
}
