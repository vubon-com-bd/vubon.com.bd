import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DispatchListOptionsDTO } from '@application/services/interfaces/dispatch.service.interface';
export class ListDispatchesQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list';
  constructor(public readonly options: DispatchListOptionsDTO) { super(); }
}
